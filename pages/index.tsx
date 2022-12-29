import { GetStaticProps } from "next";
import Head from "next/head";
import Header from "../src/components/header";
import { getRequest } from "../src/services/api";

type Pizza = {
  id: string;
  flavor: string;
  type: string;
  price: number;
  ingredients: string[];
  img: string;
};

type HomeProps = {
  pizzas: Pizza[];
};

export default function Home({ pizzas }: HomeProps) {
  console.log(pizzas);

  return (
    <>
      <Head>
        <title>Pizzaria</title>
      </Head>
      <main>
        <Header />


      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const pizzas = await getRequest('pizzas');
  const pizzas = [{}];

  return {
    props: { pizzas },
    revalidate: 60 * 60,
  };
};
