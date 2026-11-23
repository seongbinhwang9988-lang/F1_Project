/* 사진 비교: 같은 페이지 안의 탭 및 확대 대화상자 */
(()=>{
 const tabs=[...document.querySelectorAll('[data-photo-tab]')];
 function select(tab){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected})}
 tabs.forEach((t,i)=>{t.onclick=()=>select(t);t.onkeydown=e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();select(tabs[n]);tabs[n].focus()}});
 const dialog=document.getElementById('photoDialog'),image=document.getElementById('photoDialogImage');
 document.querySelectorAll('[data-photo-src]').forEach(b=>b.onclick=()=>{image.src=b.dataset.photoSrc;image.alt=b.dataset.photoTitle;document.getElementById('photoDialogTitle').textContent=b.dataset.photoTitle;dialog.showModal()});
 document.getElementById('closePhotoDialog').onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
})();
