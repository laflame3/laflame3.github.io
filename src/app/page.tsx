import Site from '@/components/Site';
import {loadPage} from '@/lib/site';
export default function Home(){return <Site slug="about" data={loadPage('about')}/>}

export const metadata = {alternates:{canonical:'/'}};
