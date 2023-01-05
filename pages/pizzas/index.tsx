import { GetStaticProps } from "next";
import Head from "next/head";
import { Box, Grid } from "@mui/material";

import { getRequest } from "../../src/services/api";
import PizzaCard from "../../src/components/pizzaCard";
import Header from "../../src/components/header";
import { Pizza } from "../../src/Types";

type HomeProps = {
  pizzas: Pizza[];
};

export default function Pizzas({ pizzas }: HomeProps) {
  return (
    <>
      <Head>
        <title>Pizzas</title>
      </Head>
      <Header />
      <Box
        sx={{
          backgroundColor: "GrayText",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Grid container spacing={4}>
          {pizzas.map((pizza) => (
            <PizzaCard info={pizza} key={pizza.id} />
          ))}
        </Grid>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await getRequest("pizzas");
    return {
      props: { pizzas: data },
      revalidate: 60 * 60,
    };
  }
  catch (e) {
    return {
      props: { pizzas: [] }
    };
  }
};
