import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
    <nav className="flex items-center gap-8 text-gray-500 font-semibold">
      <Link href='/' className="text-primary font-semibold text-2xl">PIZZA CUBED</Link>
      <Link href='/'>HOME</Link>
      <Link href='/'>Menu</Link>
      <Link href='/'>About</Link>
      <Link href='/'>Contact</Link>
    </nav>
    <nav className="flex  gap-4 items-center text-gray-500 font-semibold">
      <Link href='/login'>Login</Link>
      <Link href='/register' className="bg-primary rounded-full text-white py-2 px-6">Register</Link>
    </nav>
  </header>
  )
}

export default Header
