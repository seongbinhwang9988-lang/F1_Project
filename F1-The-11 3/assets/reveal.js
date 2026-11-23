/* 스크롤 등장: 같은 페이지 내 순서대로 한 번씩 나타나며 동작 줄이기 설정을 존중합니다. */
(()=>{
 const selector=[
 '.hero-top .eyebrow','.hero h1','.hero .tagline','.hero-aside','.hero-car','.hero-bottom > *',
 '.section-head > *','.gallery-meta','.team-card','.gallery-foot > *','.film > *',
 '.route > .back-link','.page-title > *','.overview-grid > div > *',
 '.archive-item .archive-visual','.archive-item > div:not(.archive-visual) > *',
 '.process-block > h2','.process-grid figure','.process-block > .caption','.compare','.compare-labels',
 '.profile-mark','.profile-copy > *','.photo-revisions > .eyebrow','.photo-revisions > h2',
 '.photo-revisions > p','.photo-tabs','.photo-pair figure','.site-footer > *'
 ].join(',');
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window))return;
 const targets=[...document.querySelectorAll(selector)];
 targets.forEach(e=>{e.classList.add('scroll-reveal');const siblings=[...e.parentElement.children].filter(n=>n.matches(selector));e.style.setProperty('--reveal-delay',((siblings.indexOf(e)%4)*90)+'ms')});
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -24px 0px'});
 function observe(){targets.forEach(e=>{if(!e.classList.contains('is-visible'))observer.observe(e)})}
 if(document.getElementById('intro')&&!document.getElementById('intro').hidden)document.addEventListener('f1:entered',observe,{once:true});else observe();
 document.addEventListener('focusin',e=>{const el=e.target.closest('.scroll-reveal');if(el){el.classList.add('is-visible');observer.unobserve(el)}});
})();
