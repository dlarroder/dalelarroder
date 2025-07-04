import Contact from './components/contact';
import Hero from './components/hero-v2/hero';
import Intro from './components/intro';
import { ScrollProvider } from './components/providers/ScrollProvider';
import Works from './components/work/works';

export default function Home() {
  return (
    <ScrollProvider>
      <Hero />
      <Intro />
      <Works />
      <Contact />
    </ScrollProvider>
  );
}
