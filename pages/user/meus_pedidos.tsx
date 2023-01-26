import { Container } from "@mui/material";
import { GetServerSideProps } from "next";
import CardMyPurchase from "../../src/components/CardMyPurchase";
import Layout from "../../src/components/layout";
import { getRequest, postRequest } from "../../src/services/api";
import { Order } from "../../src/Types";

type OrderProps = {
  orders: Order[];
};

const Items = [1, 2, 3, 4, 5, 6, 7];

export default function meusPedidos({ orders }: OrderProps) {
  return (
    <Layout title="meus_pedidos">
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 87px)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
        }}
      >
        {orders && orders.map((order) => (
          <CardMyPurchase {...order} key={order.id} />
        ))}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await getRequest<Order[]>(`order`);

    return {
      props: { orders: data },
    };
  } catch (error) {
    return {
      props: { orders: [] },
    };
  }
};
