import {notFound} from 'next/navigation';
import Site from '@/components/Site';
import {loadPage,slugs} from '@/lib/site';
export const dynamicParams = false;
export function generateStaticParams(){return slugs.filter(s=>s!=='about').map(slug=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:slugs.includes(slug)?loadPage(slug).en.title:'Page not found',alternates:{canonical:`/${slug}/`}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!slugs.includes(slug))notFound();return <Site slug={slug} data={loadPage(slug)}/>}
