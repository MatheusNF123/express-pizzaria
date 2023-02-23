import { GetServerSideProps } from "next";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { getRequest } from "../../src/services/api";
import { Pizza } from "../../src/Types";
import Layout from "../../src/components/layout";
import AdminPizzaCard from "../../src/components/adminPizzaCard";
import { width } from "@mui/system";

type AdminPizzasProps = {
  pizzas: Pizza[] | null;
};

const pizza = [
  {
    id: "1",
    flavor: "chocolate",
    type: "doce",
    price: 29.99,
    ingredients: ["pedra", "sabão", "feijao"],
    img: "https://f.i.uol.com.br/fotografia/2021/02/18/1613671083602eaaab101f1_1613671083_3x2_md.jpg",
  },
  {
    id: "2",
    flavor: "chocolate",
    type: "doce",
    price: 29.99,
    ingredients: ["pedra", "sabão", "feijao"],
    img: "https://f.i.uol.com.br/fotografia/2021/02/18/1613671083602eaaab101f1_1613671083_3x2_md.jpg",
  },
];

export default function AdminPizzas({ pizzas }: AdminPizzasProps) {
  return (
    <Layout title="Admin: pizzas">
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 100px)",
          // width: "100%",
          // display: "flex",
          // justifyContent: "center",
          padding: "20px",
        }}
      >
        <Grid container spacing={4}>
          {pizzas?.map((pizza) => (
            <AdminPizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </Grid>
      </Container>
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
