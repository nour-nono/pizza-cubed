import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/layout/Hero';
import About from '@/components/layout/About';
import ContactUs from '@/components/layout/ContactUs';
import Menu from '@/components/layout/Menu';
import SectionHeaders from '@/components/layout/SectionHeaders';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ContactUs />
      <Menu />
    </>
  );
}
