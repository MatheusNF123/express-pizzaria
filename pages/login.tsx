import Head from "next/head";
import LoginForm from "../src/components/loginForm";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main>
      <LoginForm/>
      </main>
    </>
  );
}
