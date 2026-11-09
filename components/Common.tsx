import { Instagram } from './InstagramIcon';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { conversation } from '@/lib/catalog';
export const brandIcon = encodeURI('/images/T botânico verde-lima minimalista.png');
export function Eyebrow({children}:{children:React.ReactNode}) { return <span className="eyebrow"><img className="tiny-cross" src={brandIcon} alt="" aria-hidden="true"/>{children}</span>; }
export function ContactCTA() { return <section className="contact-cta"><img className="cta-avocado" src="/images/abacate.webp" alt="" loading="lazy"/><div className="container contact-cta-inner reveal"><Eyebrow>O PRÓXIMO PASSO É SEU</Eyebrow><h2>COMECE DE ONDE<br/>VOCÊ ESTÁ.</h2><div><p>Uma dúvida sobre a loja ou vontade de cuidar mais de você? Vamos conversar.</p><a className="button button-lime" href={conversation} target="_blank" rel="noopener noreferrer"><Instagram size={17}/>Conversar com a FitLife</a></div></div></section>; }
export function FAQ({ items }: { items: { q:string; a:string }[] }) { return <div className="faq-list">{items.map(item => <details key={item.q}><summary>{item.q}<Plus size={20}/></summary><p>{item.a}</p></details>)}</div>; }
export function Breadcrumb({ current, shop = false }: { current:string;shop?:boolean }) { return <nav className="breadcrumb" aria-label="Caminho da página"><Link href="/">Início</Link><span>/</span>{shop && <><Link href="/loja/">Loja</Link><span>/</span></>}<span aria-current="page">{current}</span></nav>; }
