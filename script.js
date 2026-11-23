const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
toggle?.addEventListener('click',()=>{const opened=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(opened));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const header=document.querySelector('.site-header');
const progress=document.querySelector('.reading-progress');
let ticking=false;
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;const pct=max>0?100*scrollY/max:0;if(progress)progress.style.width=pct+'%';header?.classList.toggle('scrolled',scrollY>20);ticking=false;}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true;}},{passive:true});updateScroll();
const motionOK=!matchMedia('(prefers-reduced-motion: reduce)').matches;
if(motionOK&&'IntersectionObserver' in window){
 document.documentElement.classList.add('js-motion');
 const items=document.querySelectorAll('.section-heading,.two-col,.feature,.timeline article,.project-card,.activity,.contact-inner,.hero-copy,.portrait');
 items.forEach(el=>el.classList.add('reveal'));
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}})},{threshold:.08,rootMargin:'0px 0px -25px 0px'});
 items.forEach(el=>observer.observe(el));
}
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('#navigation a[href^="#"]')];
if('IntersectionObserver' in window){const sectionObserver=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible){navLinks.forEach(a=>{const active=a.getAttribute('href')==='#'+visible.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}},{rootMargin:'-15% 0px -65% 0px',threshold:0});sections.forEach(el=>sectionObserver.observe(el));}
