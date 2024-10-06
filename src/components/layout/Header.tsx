import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
    <Link href='/' className="text-primary font-semibold text-2xl">PIZZA CUBED</Link>
    <nav className="flex items-center gap-8 text-gray-500 font-semibold">
      <Link href='/'>HOME</Link>
      <Link href='/'>Menu</Link>
      <Link href='/'>About</Link>
      <Link href='/'>Contact</Link>
      <Link href='/' className="bg-primary rounded-full text-white py-2 px-6">Login</Link>
    </nav>
  </header>
  )
}

export default Header
