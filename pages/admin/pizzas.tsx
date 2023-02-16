import { GetServerSideProps } from "next";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { getRequest } from "../../src/services/api";
import { Pizza } from "../../src/Types";
import Layout from "../../src/components/layout";

type AdminPizzasProps = {
  pizzas: Pizza[] | null;
};

export default function AdminPizzas({ pizzas }: AdminPizzasProps) {
  return (
    <Layout title="Admin: pizzas">
      <Box
        sx={{
          // backgroundColor: "red",
          minHeight: "calc(100vh - 100px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      ></Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await getRequest<Pizza[]>("pizzas");
    return {
      props: { pizzas: data },
    };
  } catch (error) {
    return {
      props: { pizzas: null },
    };
  }
};
