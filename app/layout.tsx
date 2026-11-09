import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/components/StoreProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Animations } from '@/components/Animations';
export const metadata: Metadata = { metadataBase:new URL('https://fitlife-nutricao-movimento.mateusmrm.chatgpt.site'),title:{default:'FitLife — Nutrição, movimento e vida',template:'%s | FitLife'},description:'Explore a FitLife: acompanhamento, nutrição e uma seleção de suplementos para sua rotina. Conheça Victor Montalvão e encontre seu próximo passo.',openGraph:{locale:'pt_BR',type:'website',siteName:'FitLife',images:[{url:'/images/hero.webp',width:1672,height:941,alt:'Alimentos frescos em uma composição natural FitLife'}]},robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body><StoreProvider><Header/>{children}<Footer/><Animations/></StoreProvider></body></html>; }
