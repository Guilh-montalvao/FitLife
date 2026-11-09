'use client';
import { Instagram } from './InstagramIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useStore } from './StoreProvider';
import { conversation, instagram } from '@/lib/catalog';
const navigation = [{ href:'/',label:'Início' },{ href:'/loja/',label:'Loja' },{ href:'/acompanhamento/',label:'Acompanhamento' },{ href:'/victor-montalvao/',label:'Victor Montalvão' },{ href:'/receitas/',label:'Receitas' }];
const logoGreen = encodeURI('/images/Logotipo FitLife verde em fundo transparente-2.png');
const logoWhite = encodeURI('/images/Logotipo FitLife branco com folha verde-1.png');
export function Brand({ footer = false }: { footer?: boolean }) { return <Link href="/" aria-label="FitLife — início" className={`brand ${footer ? 'brand-footer' : ''}`}><span className="logo-window"><img src={footer ? logoWhite : logoGreen} alt="FitLife" width={1408} height={736}/></span>{!footer && <span className="brand-caption">NUTRIÇÃO &<br/>MOVIMENTO</span>}</Link>; }
export function Header() {
 const path = usePathname(); const { count, open } = useStore(); const [menuOpen, setMenuOpen] = useState(false); const menuRef = useRef<HTMLDialogElement>(null);
 useEffect(() => { setMenuOpen(false); }, [path]);
 useEffect(() => { if (menuOpen) { menuRef.current?.showModal(); const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = prev; }; } menuRef.current?.close(); }, [menuOpen]);
 return <><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><div className="announcement"><span>Nutrição integrativa. Performance. Vida real.</span><a href={instagram} target="_blank" rel="noopener noreferrer">@soul.fitlife <Instagram size={12}/></a></div><header className="site-header"><div className="header-inner"><Brand/><nav aria-label="Navegação principal" className="desktop-nav">{navigation.map(item => <Link key={item.href} href={item.href} className={item.href === '/' ? (path === '/' ? 'active' : '') : (path === item.href || (item.href === '/loja/' && path.startsWith('/loja/')) ? 'active' : '')}>{item.label}</Link>)}</nav><div className="header-actions"><a href={conversation} target="_blank" rel="noopener noreferrer" className="header-contact">Vamos conversar<span className="status-dot"/></a><button className="bag-button" aria-label={`Abrir sacola, ${count} itens`} onClick={open}><ShoppingBag size={21} strokeWidth={1.6}/><span>{count}</span></button><button className="menu-button icon-button" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}><Menu size={25}/></button></div></div></header>
 <dialog ref={menuRef} className="mobile-menu" aria-labelledby="menu-title" onCancel={e => { e.preventDefault(); setMenuOpen(false); }}><div className="mobile-menu-head"><span id="menu-title" className="eyebrow">EXPLORE A FITLIFE</span><button className="icon-button" autoFocus aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><X size={25}/></button></div><nav aria-label="Navegação no celular">{navigation.map((item,i) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><span>0{i+1}</span>{item.label}</Link>)}</nav><a className="button button-green" href={conversation} target="_blank" rel="noopener noreferrer">Conversar com a FitLife</a></dialog></>;
}
