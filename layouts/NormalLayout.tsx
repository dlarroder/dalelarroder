import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SectionContainer from '../components/SectionContainer';

interface Props {
  children: ReactNode;
}

export default function NormalLayout({ children }: Props) {
  const variants = {
    hidden: { opacity: 0, x: -200 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  return (
    <SectionContainer>
      <Header />
      <motion.main
        data-scroll
        className="mb-auto"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
      <Footer />
    </SectionContainer>
  );
}
