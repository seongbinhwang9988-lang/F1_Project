/* 문구 편집기. 실제 문구와 페이지별 각주는 content.js에서 수정합니다. */
(()=>{
 const defaults=JSON.parse(JSON.stringify(window.F1_COPY));
 const teamDefaults=window.F1_TEAMS.map(t=>[...t]);
 const key='f1-copy-photo-review-v3-'+(window.F1_DOCUMENT_ID||'source');
 let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch{}
 let state={...(window.F1_EMBEDDED_COPY||{}),...saved};
 const panel=document.getElementById('editorPanel'), fields=document.getElementById('editorFields'), page=document.getElementById('editorPage'), status=document.getElementById('editorStatus');
 const names={home:'메인·갤러리',archive:'Prompt Archive',overview:'Overview',artist:'Artist Profile',process:'The Process',common:'공통 메뉴·푸터',teams:'팀 이름·작품 설명'};
 function apply(){
  document.querySelectorAll('[data-copy-key]').forEach(n=>{const k=n.dataset.copyKey;n.textContent=state[k]??defaults[k]??n.textContent});
  window.F1_APP.teams.forEach((t,i)=>{for(let j=1;j<4;j++)t[j]=state[`team_${i}_${j}`]??teamDefaults[i][j]});
  window.F1_APP.renderTeamCards();
 }
 function input(k,value,label,foot){
  const row=document.createElement('div');row.className='editor-field';
  const lab=document.createElement('label');lab.textContent=label;lab.htmlFor='edit-'+k;
  const area=document.createElement('textarea');area.id='edit-'+k;area.dataset.key=k;area.value=value;
  const small=document.createElement('small');small.textContent='※ 수정 위치: '+foot;
  row.append(lab,area,small);fields.append(row);
 }
 function render(){
  fields.replaceChildren();status.textContent='';
  if(page.value==='teams'){
   window.F1_APP.teams.forEach((t,i)=>{for(let j=1;j<4;j++){const k=`team_${i}_${j}`,label=t[2]+' / '+['','영문 팀 이름','한글 팀 이름','작품 설명'][j];input(k,state[k]??teamDefaults[i][j],label,'메인 갤러리 및 작품 확대 / '+label)}});
  }else{
   Object.keys(defaults).filter(k=>k.startsWith(page.value+'_')).forEach(k=>{input(k,state[k]??defaults[k],window.F1_COPY_LABELS[k],names[page.value]+' / '+k)});
  }
 }
 function collect(){fields.querySelectorAll('textarea').forEach(n=>state[n.dataset.key]=n.value)}
 function persist(){try{localStorage.setItem(key,JSON.stringify(state));return true}catch{return false}}
 function download(text,type,name){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
 document.getElementById('editToggle').onclick=()=>{const current=(location.hash||'#home').slice(1);page.value=names[current]?current:'home';render();panel.hidden=false;document.getElementById('editToggle').setAttribute('aria-expanded','true');page.focus()};
 document.getElementById('closeEditor').onclick=()=>{panel.hidden=true;document.getElementById('editToggle').setAttribute('aria-expanded','false');document.getElementById('editToggle').focus()};
 page.onchange=()=>{collect();render()};
 document.getElementById('saveEdits').onclick=()=>{collect();apply();status.textContent=persist()?'저장했습니다. 다른 기기에서 사용하려면 수정 HTML도 저장하세요.':'화면에 반영했습니다. 브라우저 저장이 제한되어 있으므로 수정 HTML을 저장하세요.'};
 document.getElementById('resetEdits').onclick=()=>{const prefix=page.value==='teams'?'team_':page.value+'_';Object.keys(state).filter(k=>k.startsWith(prefix)).forEach(k=>delete state[k]);persist();apply();render();status.textContent='현재 페이지의 문구를 초기화했습니다.'};
 document.getElementById('exportHtml').onclick=()=>{
  collect();apply();persist();
  const doc=document.documentElement.cloneNode(true);
  doc.querySelectorAll('script[data-saved-copy]').forEach(n=>n.remove());
  doc.querySelector('#editorPanel').hidden=true;doc.querySelector('#editorFields').replaceChildren();doc.querySelector('#editorStatus').textContent='';doc.querySelector('#editToggle').setAttribute('aria-expanded','false');
  doc.querySelectorAll('.route').forEach(n=>n.hidden=n.id!=='home');doc.querySelectorAll('dialog').forEach(n=>n.removeAttribute('open'));
  doc.querySelector('#teamTrack').replaceChildren();doc.querySelector('#intro').hidden=false;
  const embedded=document.createElement('script');embedded.dataset.savedCopy='true';embedded.textContent='window.F1_DOCUMENT_ID='+JSON.stringify(String(Date.now()))+';window.F1_EMBEDDED_COPY='+JSON.stringify(state).replace(/</g,'\\u003c')+';';
  const first=doc.querySelector('script');first.parentNode.insertBefore(embedded,first);
  download('<!doctype html>\n'+doc.outerHTML,'text/html;charset=utf-8','index-edited.html');status.textContent='HTML을 저장했습니다. assets 폴더와 나란히 두고 열어주세요.';
 };
 document.getElementById('exportCopy').onclick=()=>{
  collect();apply();const copy={...defaults,...Object.fromEntries(Object.entries(state).filter(([k])=>!k.startsWith('team_')))};
  const source='/* 문구 편집기에서 저장한 파일. 각 키의 페이지 위치는 F1_COPY_LABELS에서 확인하세요. */\nwindow.F1_COPY='+JSON.stringify(copy,null,2)+';\nwindow.F1_COPY_LABELS='+JSON.stringify(window.F1_COPY_LABELS,null,2)+';\nwindow.F1_TEAMS='+JSON.stringify(window.F1_APP.teams,null,2)+';\n';
  download(source,'text/javascript;charset=utf-8','content.js');status.textContent='문구 파일을 저장했습니다. 폴더 최상위 content.js를 교체하면 적용됩니다.';
 };
 apply();
})();
