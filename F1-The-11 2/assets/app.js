function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
// 인터랙션: 오프닝, 팀 갤러리, 영상, 페이지 이동. 문구는 content.js에서 수정합니다.
function safeSessionGet(k){try{return sessionStorage.getItem(k)}catch{return null}}
function safeSessionSet(k,v){try{sessionStorage.setItem(k,v)}catch{}}

const teams=window.F1_TEAMS.map(team=>[...team]);
const $=s=>document.querySelector(s),intro=$('#intro'),iv=$('#introVideo');let currentTeam=0,dragged=false;
let entering=false;
function enter(){
 if(entering)return;entering=true;
 if(location.hash!=='#home')location.hash='home';
 window.scrollTo({top:0,behavior:'instant'});
 iv.pause();safeSessionSet('f1-entered','1');
 const finish=()=>{intro.hidden=true;intro.classList.remove('leaving');entering=false;$('#exhibition-title').setAttribute('tabindex','-1');$('#exhibition-title').focus({preventScroll:true})};
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return}
 intro.classList.add('leaving');
 intro.addEventListener('transitionend',e=>{if(e.target===intro)finish()},{once:true});
 setTimeout(()=>{if(entering)finish()},850);
}
$('#enterExhibition').onclick=enter;$('#skipIntro').onclick=enter;iv.onended=enter;iv.onclick=()=>{if(iv.ended)enter();else if(iv.paused)iv.play().catch(()=>{})};iv.onerror=()=>{$('#introStatus').textContent='영상 재생이 어렵다면 전시 입장을 눌러주세요'};$('#introSound').onclick=()=>{iv.muted=!iv.muted;$('#introSound').textContent=iv.muted?'사운드 켜기':'사운드 끄기';$('#introSound').setAttribute('aria-pressed',String(!iv.muted));if(iv.paused){iv.currentTime=0;iv.play().catch(()=>{})}};$('#replayIntro').onclick=()=>{entering=false;intro.classList.remove('leaving');intro.hidden=false;iv.currentTime=0;iv.play().catch(()=>{});$('#skipIntro').focus()};if(safeSessionGet('f1-entered')||location.hash){intro.hidden=true;iv.pause()}else{iv.play().catch(()=>{$('#introStatus').textContent='영상을 누르면 재생됩니다 · 바로 입장도 가능합니다'})}
const track=$('#teamTrack');function renderTeamCards(){track.replaceChildren();teams.forEach((t,i)=>{const b=document.createElement('button');b.className='team-card';b.setAttribute('aria-label',t[2]+' 작품 크게 보기');b.innerHTML=`<div class="car-stage"><img src="assets/${t[0]}.png" alt="${escapeHtml(t[2])} 레이싱 카 사이드 프로필" loading="lazy" draggable="false"></div><div class="card-copy"><small>F1: SIDE PROFILE</small><h3>${escapeHtml(t[1])}</h3><p>${escapeHtml(t[2])}</p><span class="card-action">작품 자세히 보기</span></div>`;b.onclick=()=>{if(!dragged)openTeam(i)};track.append(b)});requestAnimationFrame(updateTrack)}
renderTeamCards();
function showTeam(i){currentTeam=(i+teams.length)%teams.length;const t=teams[currentTeam];$('#detailImage').src='assets/'+t[0]+'.png';$('#detailImage').alt=t[2]+' 레이싱 카 AI 생성 이미지';$('#detailCountry').textContent=t[2];$('#detailName').textContent=t[1];$('#detailDescription').textContent=t[3]}
function openTeam(i){showTeam(i);$('#artDialog').showModal()}$('#detailPrev').onclick=()=>showTeam(currentTeam-1);$('#detailNext').onclick=()=>showTeam(currentTeam+1);
function updateTrack(){ $('#previousTeam').disabled=track.scrollLeft<5;$('#nextTeam').disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-5}track.addEventListener('scroll',updateTrack,{passive:true});window.addEventListener('resize',updateTrack);updateTrack();$('#previousTeam').onclick=()=>track.scrollBy({left:-(track.firstChild.clientWidth+22),behavior:'smooth'});$('#nextTeam').onclick=()=>track.scrollBy({left:track.firstChild.clientWidth+22,behavior:'smooth'});
let startX=0,startScroll=0,down=false;track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;down=true;dragged=false;startX=e.clientX;startScroll=track.scrollLeft});window.addEventListener('pointermove',e=>{if(!down)return;if(Math.abs(e.clientX-startX)>7){dragged=true;track.classList.add('dragging');track.scrollLeft=startScroll-(e.clientX-startX);e.preventDefault()}});window.addEventListener('pointerup',()=>{down=false;track.classList.remove('dragging');setTimeout(()=>dragged=false,100)});track.addEventListener('dragstart',e=>e.preventDefault());
function openFilm(){$('#filmDialog').showModal();$('#filmVideo').play().catch(()=>{})}['openFilm','playFilm','archiveFilm'].forEach(id=>$('#'+id).onclick=openFilm);document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$('#'+b.dataset.close).close());document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()});d.addEventListener('close',()=>{$('#filmVideo').pause()})});document.addEventListener('keydown',e=>{if($('#artDialog').open){if(e.key==='ArrowLeft')showTeam(currentTeam-1);if(e.key==='ArrowRight')showTeam(currentTeam+1)}if(e.key==='Escape'&&!intro.hidden)enter()});
$('#compareRange').oninput=e=>$('#afterImage').style.clipPath=`inset(0 ${100-e.target.value}% 0 0)`;
const menu=$('.menu-toggle');menu.onclick=()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));$('#navigation').classList.toggle('open',!expanded)};
function route(){const key=location.hash.slice(1)||'home';const page=['archive','overview','artist','process'].includes(key)?key:'home';document.querySelectorAll('.route').forEach(x=>x.hidden=x.id!==page);document.querySelectorAll('.nav a').forEach(a=>{if(a.hash==='#'+page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});$('#navigation').classList.remove('open');menu.setAttribute('aria-expanded','false');if(key==='gallery')requestAnimationFrame(()=>$('#gallery').scrollIntoView());else window.scrollTo({top:0,behavior:'instant'});document.title=(page==='home'?'F1: The 11':{archive:'Prompt Archive',overview:'Overview',artist:'Artist Profile',process:'The Process'}[page])+' — 황성빈의 온라인 전시';if(page==='home')requestAnimationFrame(updateTrack)}window.addEventListener('hashchange',route);route();

window.F1_APP={teams,renderTeamCards,showTeam};
