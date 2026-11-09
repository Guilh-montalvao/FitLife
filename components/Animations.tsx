'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function Animations() {
 const path = usePathname();
 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
   gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => { gsap.fromTo(el,{ y:28, opacity:0 },{ y:0,opacity:1,duration:.8,ease:'power2.out',scrollTrigger:{ trigger:el,start:'top 94%',once:true } }); });
   if (window.innerWidth > 900) gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el => { gsap.fromTo(el,{ yPercent:-3 },{ yPercent:3,ease:'none',scrollTrigger:{ trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:1 } }); });
   const timer = setTimeout(() => ScrollTrigger.refresh(), 400);
   return () => clearTimeout(timer);
  });
  return () => media.revert();
 }, [path]);
 return null;
}
