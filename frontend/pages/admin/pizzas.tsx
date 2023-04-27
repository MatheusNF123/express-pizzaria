import { GetServerSideProps } from "next";
import { useState } from "react";
import { Button, Container, Grid, Box } from "@mui/material";

import { getRequest, postRequest } from "../../src/services/api";
import { Pizza } from "../../src/Types";
import Layout from "../../src/components/layout";
import AdminPizzaCard from "../../src/components/adminPizzaCard";
import PizzaCreateModalForm from "../../src/components/pizzaCreateModalForm";
import setApiHeaders from "../../src/services/setApiHeaders";

type AdminPizzasProps = {
  pizzas: Pizza[] | null;
};

export default function AdminPizzas(props: AdminPizzasProps) {
  const [pizzas, setPizzas] = useState<Pizza[] | null>(props.pizzas);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handlePizzasReload = async () => {
    const { data } = await getRequest<Pizza[]>("pizzas");

    setPizzas(data);
  };

  const handlePizzaCreate = async (pizzaInfo: Omit<Pizza, "id">) => {
    setApiHeaders();
    await postRequest("admin/pizza", pizzaInfo);

    await handlePizzasReload();
    setOpenCreateModal(false);
  };

  return (
    <Layout title="Admin: pizzas">
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 100px)",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            marginBottom: "15px",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button
            variant="contained"
            sx={{ width: { xs: "100%", sm: "200px" }, fontWeight: "bold" }}
            onClick={() => setOpenCreateModal(true)}
          >
            Criar pizza
          </Button>
        </Box>
        <Grid container spacing={4}>
          {pizzas?.map((pizza) => (
            <AdminPizzaCard
              key={pizza.id}
              pizza={pizza}
              handlePizzasReload={handlePizzasReload}
            />
          ))}
        </Grid>
        <PizzaCreateModalForm
          open={openCreateModal}
          handleClose={() => setOpenCreateModal(false)}
          handlePizzaCreate={handlePizzaCreate}
        />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    setApiHeaders(ctx);
    const { data, status } = await getRequest<Pizza[]>("admin/pizzas");

    if (status !== 200)
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };

    return {
      props: { pizzas: data },
    };
  } catch (error) {
    return {
      props: { pizzas: null },
    };
  }
};
