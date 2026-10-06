import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title: {default:'Yanxi Li · Physics, Quant & Data',template:'%s · Yanxi Li'},description:'Yanxi Li (Travis), MSc Physics student at King’s College London. Quantitative research, market modelling and AI research tools.',metadataBase:new URL('https://laflame3.github.io'),openGraph:{title:'Yanxi Li · Physics, Quant & Data',description:'Physics, quantitative research and AI research tools.',type:'website',url:'https://laflame3.github.io/',siteName:'Yanxi Li'},robots:{index:true,follow:true}};
export default function Layout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
