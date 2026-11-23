/* 첨부 원본 PNG는 보존하고 화면에 표시할 때만 테두리에 연결된 밝은 체크무늬를 투명화합니다.
   차량 내부의 흰 글자·하이라이트는 바깥 배경과 분리되어 있으므로 그대로 유지합니다. */
(()=>{
 const image=document.querySelector('img[data-remove-checkerboard]');if(!image)return;
 async function displayCar(){
  try{
   const source=new Image();source.src=window.F1_HERO_IMAGE||image.src;await source.decode();
   const width=source.naturalWidth,height=source.naturalHeight;
   const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
   const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(source,0,0);
   const frame=ctx.getImageData(0,0,width,height),pixels=frame.data;
   const visited=new Uint8Array(width*height),queue=new Int32Array(width*height);let head=0,tail=0;
   function enqueue(pos){if(visited[pos])return;visited[pos]=1;const i=pos*4,r=pixels[i],g=pixels[i+1],b=pixels[i+2];if(Math.min(r,g,b)>=222&&Math.max(r,g,b)-Math.min(r,g,b)<=14){queue[tail++]=pos;pixels[i+3]=0}}
   for(let x=0;x<width;x++){enqueue(x);enqueue((height-1)*width+x)}
   for(let y=1;y<height-1;y++){enqueue(y*width);enqueue(y*width+width-1)}
   while(head<tail){const pos=queue[head++],x=pos%width;if(x>0)enqueue(pos-1);if(x<width-1)enqueue(pos+1);if(pos>=width)enqueue(pos-width);if(pos<(height-1)*width)enqueue(pos+width)}
   ctx.putImageData(frame,0,0);const src=canvas.toDataURL('image/png');
   image.src=src;await image.decode();image.dataset.backgroundProcessed='true';
  }catch(error){console.warn('원본 차량 이미지를 표시합니다.',error)}
  finally{image.classList.add('car-ready')}
 }
 displayCar();
})();
