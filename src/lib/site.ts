import { getTomlContent, getMarkdownContent } from './content';
export type Locale = 'en' | 'zh';
export type SiteData = { title: string; description: string; body: string; navigation: {title:string;target:string;href:string}[] };
export const slugs = ['about','experience','projects','cv','contact','ask'];
export function loadPage(slug: string): Record<Locale, SiteData> {
 function load(locale: Locale): SiteData {
  const page = getTomlContent<{title:string;description:string;source:string}>(`${slug}.toml`,locale)!;
  const config = getTomlContent<{navigation:SiteData['navigation']}>('config.toml',locale)!;
  return {...page,body:getMarkdownContent(page.source,locale),navigation:config.navigation.map(n=>({title:n.title,target:n.target,href:n.href}))};
 }
 return {en:load('en'),zh:load('zh')};
}
