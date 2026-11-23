/* 페이지 재방문과 F1 로고 클릭 때마다 스크롤 등장 효과를 다시 준비합니다. */
(()=>{
 const selector=[
 '.hero-top .eyebrow','.hero h1','.hero .tagline','.hero-aside','.hero-car-stage','.hero-bottom > *',
 '.section-head > *','.gallery-meta','.team-card','.gallery-foot > *','.film > *',
 '.route > .back-link','.page-title > *','.overview-grid > div > *',
 '.archive-item .archive-visual','.archive-item > div:not(.archive-visual) > *',
 '.process-block > h2','.process-grid figure','.process-block > .caption','.compare','.compare-labels',
 '.profile-mark','.profile-copy > *','.photo-revisions > .eyebrow','.photo-revisions > h2',
 '.photo-revisions > p','.photo-tabs','.photo-pair figure','.site-footer > *'
 ].join(',');
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window))return;
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -24px 0px'});
 let generation=0;
 function prepare(){
  const run=++generation;observer.disconnect();
  const route=document.querySelector('.route:not([hidden])');
  const targets=[...(route?route.querySelectorAll(selector):[]),...document.querySelectorAll('.site-footer > *')];
  targets.forEach(e=>{e.classList.add('scroll-reveal','reveal-reset');e.classList.remove('is-visible');const siblings=[...e.parentElement.children].filter(n=>n.matches(selector));e.style.setProperty('--reveal-delay',((siblings.indexOf(e)%4)*90)+'ms')});
  // 이미 나타난 요소도 초기화하여 같은 메인 경로 재방문에서도 다시 재생합니다.
  void document.body.offsetHeight;
  requestAnimationFrame(()=>{if(run!==generation)return;targets.forEach(e=>e.classList.remove('reveal-reset'));if(document.getElementById('intro')&&!document.getElementById('intro').hidden)return;targets.forEach(e=>observer.observe(e))});
 }
 document.addEventListener('f1:route',prepare);
 document.addEventListener('f1:opening',prepare);
 document.addEventListener('f1:entered',prepare);
 document.addEventListener('focusin',e=>{const el=e.target.closest('.scroll-reveal');if(el){el.classList.add('is-visible');observer.unobserve(el)}});
 prepare();
})();
