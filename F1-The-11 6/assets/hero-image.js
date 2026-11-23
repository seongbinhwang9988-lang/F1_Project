/* 원본을 보존하고 표시용 알파를 만듭니다. 외부 배경/콕핏 구멍을 제거하고
   경계의 흰 배경색을 정리한 뒤 1픽셀 수준으로 부드럽게 마감합니다. */
(()=>{
 const image=document.querySelector('img[data-remove-checkerboard]');if(!image)return;
 async function displayCar(){
  try{
   const source=new Image();source.src=window.F1_HERO_IMAGE||image.src;await source.decode();
   const width=source.naturalWidth,height=source.naturalHeight,count=width*height;
   const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(source,0,0);
   const frame=ctx.getImageData(0,0,width,height),pixels=frame.data;
   const visited=new Uint8Array(count),queue=new Int32Array(count);let head=0,tail=0;
   function enqueue(pos){if(pos<0||pos>=count||visited[pos])return;visited[pos]=1;const i=pos*4,r=pixels[i],g=pixels[i+1],b=pixels[i+2];if(Math.min(r,g,b)>=210&&Math.max(r,g,b)-Math.min(r,g,b)<=22){queue[tail++]=pos;pixels[i+3]=0}}
   for(let x=0;x<width;x++){enqueue(x);enqueue((height-1)*width+x)}
   for(let y=1;y<height-1;y++){enqueue(y*width);enqueue(y*width+width-1)}
   // 이 원본에서 차체 구조로 둘러싸인 두 콕핏 배경 영역의 내부 좌표.
   // 흰 로고 전체를 색으로 제거하지 않고 이 두 배경 성분에만 연결합니다.
   for(const[x,y]of [[1100,214],[1208,241]])enqueue(Math.round(y*height/724)*width+Math.round(x*width/2172));
   while(head<tail){const pos=queue[head++],x=pos%width;if(x>0)enqueue(pos-1);if(x<width-1)enqueue(pos+1);enqueue(pos-width);enqueue(pos+width)}
   // 알파 경계로부터 4픽셀 안쪽의 거리만 구해 글자와 차체 내부는 보호합니다.
   const distance=new Uint8Array(count);distance.fill(255);head=0;tail=0;
   for(let pos=0;pos<count;pos++){
    if(!pixels[pos*4+3]){distance[pos]=0;continue}
    const x=pos%width;
    if((x>0&&!pixels[(pos-1)*4+3])||(x<width-1&&!pixels[(pos+1)*4+3])||(pos>=width&&!pixels[(pos-width)*4+3])||(pos<count-width&&!pixels[(pos+width)*4+3])){distance[pos]=1;queue[tail++]=pos}
   }
   while(head<tail){const pos=queue[head++],d=distance[pos]+1;if(d>4)continue;const x=pos%width;for(const next of [x>0?pos-1:-1,x<width-1?pos+1:-1,pos-width,pos+width])if(next>=0&&next<count&&pixels[next*4+3]&&distance[next]>d){distance[next]=d;queue[tail++]=next}}
   const original=new Uint8ClampedArray(pixels);
   for(let pos=0;pos<count;pos++){
    const d=distance[pos];if(!d||d>3)continue;
    const x=pos%width,y=Math.floor(pos/width),i=pos*4;let inner=-1,best=26;
    for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){
     const xx=x+dx,yy=y+dy,sq=dx*dx+dy*dy;
     if(xx<0||xx>=width||yy<0||yy>=height||sq>=best)continue;
     const next=yy*width+xx;if(original[next*4+3]&&distance[next]>=4){best=sq;inner=next*4}
    }
    if(inner<0){
     // 얇은 안테나 등은 실루엣을 유지하고 밝은 테두리 픽셀만 약하게 처리합니다.
     const lo=Math.min(original[i],original[i+1],original[i+2]),hi=Math.max(original[i],original[i+1],original[i+2]);
     pixels[i+3]=d===1?(lo>160&&hi-lo<40?40:190):255;continue;
    }
    if(d===1){pixels[i+3]=0;continue}
    pixels[i+3]=d===2?175:255;
    // 흰 배경이 섞여 안쪽보다 밝아진 경계색만 인접 차체색으로 보정합니다.
    const lift=(original[i]-original[inner]+original[i+1]-original[inner+1]+original[i+2]-original[inner+2])/3;
    if(lift>8)for(let c=0;c<3;c++)pixels[i+c]=original[inner+c];
   }
   ctx.putImageData(frame,0,0);image.src=canvas.toDataURL('image/png');await image.decode();image.dataset.backgroundProcessed='true';image.dataset.edgeRefined='true';
  }catch(error){console.warn('원본 차량 이미지를 표시합니다.',error)}
  finally{image.classList.add('car-ready')}
 }
 displayCar();
})();
