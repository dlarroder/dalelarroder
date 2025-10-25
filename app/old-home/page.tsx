import Contact from '../components/contact';
import Hero from '../components/hero/hero';
import Intro from '../components/intro';
import Footer from '../components/layouts/footer';
import Header from '../components/layouts/header';
import { ScrollProvider } from '../components/providers/ScrollProvider';
import Works from '../components/work/works';

export default function OldHomePage() {
	return (
		<ScrollProvider>
			<Header />
			<Hero />
			<Intro />
			<Works />
			<Contact />
			<Footer />
		</ScrollProvider>
	);
}
