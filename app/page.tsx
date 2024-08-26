import Contact from '@/components/Contact/Contact';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import { ScrollProvider } from '@/components/Providers/ScrollProvider';
import Works from '@/components/Work/Works';

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
