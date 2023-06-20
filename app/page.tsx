import Hero from '@/components/Hero';
import Intro from '@/components/Intro/Intro';
import { ScrollObserver } from './components/ScrollObserver';

export default function Page() {
  return (
    <ScrollObserver>
      <Hero />
      <Intro />
    </ScrollObserver>
  );
}
