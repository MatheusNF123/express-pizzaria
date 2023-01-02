import { GetStaticProps } from "next";
import Head from "next/head";
import { Grid, Button } from "@mui/material";
import Link from "next/link";
// import Image from "next/image";

import { getRequest } from "../src/services/api";
import PizzaCard from "../src/components/pizzaCard";
import Header from "../src/components/header";
import { Pizza } from "../src/Types";

type HomeProps = {
  pizzas: Pizza[];
};

export default function Pizzas({ pizzas }: HomeProps) {
  console.log("sadsd", pizzas);

  return (
    <>
      <Head>
        <title>Pizzas</title>
      </Head>
      <main>
        <Header />

        <Grid
          container
          // spacing={4}
          sx={{
            backgroundColor: "GrayText",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            padding: '20px',
            width: "100%",
            height: "100vh",
            gap: '5px',
          }}
        >
          {pizzas.map((pizza) => (
            // <PizzaCard key={pizza.id} />
            <Grid
              key={pizza.id}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                backgroundColor: "lightcoral",
                display: "flex",
                width: "180px",
                height: "200px",
                borderRadius: "10px",
              }}
            >
              sadsa
            </Grid>
          ))}
        </Grid>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getRequest("pizzas");

  return {
    props: { pizzas: data },
    revalidate: 60 * 60,
  };
};
