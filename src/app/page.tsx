import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Menu from "@/components/layout/menu";

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <Menu />
    </>
  );
}
