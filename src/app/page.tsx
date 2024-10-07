import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/layout/Hero";
import About from "@/components/layout/About";
import ContactUs from "@/components/layout/ContactUs";

export default function Home() {
  return (
    <>
    <Hero />
    <About />
    <ContactUs />
    </>
  );
}
