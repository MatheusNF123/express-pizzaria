import { GetServerSideProps } from "next";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { getRequest } from "../../src/services/api";
import { Pizza } from "../../src/Types";
import Layout from "../../src/components/layout";
import AdminPizzaCard from "../../src/components/adminPizzaCard";
import { width } from "@mui/system";
import { useState } from "react";

type AdminPizzasProps = {
  pizzas: Pizza[] | null;
};

export default function AdminPizzas(props: AdminPizzasProps) {
  const [pizzas, setPizzas] = useState<Pizza[] | null>(props.pizzas);

  const handlePizzasReload = async () => {
    const { data } = await getRequest<Pizza[]>("pizzas");

    setPizzas(data);
  };

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
            <AdminPizzaCard
              key={pizza.id}
              pizza={pizza}
              handlePizzasReload={handlePizzasReload}
            />
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
