import Intro from '@/components/Intro';
import { ScrollProvider } from '@/components/Providers/ScrollProvider';
import Works from '@/components/Work/Works';
import Contact from 'app/components/contact';
import Hero from 'app/components/hero/hero';

export default function Page() {
  return (
    <ScrollProvider>
      <Hero />
      <Intro />
      <Works />
      <Contact />
    </ScrollProvider>
  );
}
