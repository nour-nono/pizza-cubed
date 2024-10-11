import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import ShoppingCart from "@/components/icons/ShoppingCart";

interface AuthLinksProps {
  status: "authenticated" | "loading" | "unauthenticated";
  userName: string | null | undefined;
}

const AuthLinks: React.FC<AuthLinksProps> = ({ status, userName }) => {
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </>
    );
  }
};

const Header: React.FC = () => {
  const { data: session, status} = useSession();
  const userData = session?.user;
  let userName = userData?.name || userData?.email;
  if (userName) userName = userName.split(/[\s@]+/)[0]; // split by space or @ so 'nour eldeen@g.c' => 'nour'
  return (
    <header className="flex justify-between items-center">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href="/" className="text-primary font-semibold text-2xl">
          PIZZA CUBED
        </Link>
        <Link href={"/"}>HOME</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={"/#contact"}>Contact</Link>
      </nav>
      <nav className="flex gap-4 items-center text-gray-500 font-semibold">
      <AuthLinks status={status} userName={userName} />
        <Link href={'/cart'}>
          <ShoppingCart />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
