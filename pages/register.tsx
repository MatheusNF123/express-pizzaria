import Head from "next/head";
import RegisterForm from "../src/components/registerForm";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <main>
      <RegisterForm/>
      </main>
    </>
  );
}
