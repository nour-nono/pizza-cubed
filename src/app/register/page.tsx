import Image from "next/image";
const RegisterPage = () => {
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      <form className="max-w-xs mx-auto">
        <input type="email" name="" id="" placeholder="email" />
        <input type="password" name="" id="" placeholder="password"/>
        <button type="submit">
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center">
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
