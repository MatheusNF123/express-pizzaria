import { GetServerSideProps } from "next";
import Head from "next/head";
import { Box, Grid } from "@mui/material";

import { getRequest } from "../../src/services/api";
import Header from "../../src/components/header";
import { Pizza } from "../../src/Types";

type PizzaDetailsProps = {
  pizza: Pizza;
};

export default function PizzaDetails({ pizza }: PizzaDetailsProps) {
  return (
    <>
      <Head>
        <title>Pizza Details</title>
      </Head>
      <Header />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await getRequest(`pizzas/${ctx.query.id}`);

  return {
    props: { pizza: data },
  };
};
