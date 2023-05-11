import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import CardMyPurchase from "../../src/components/CardMyPurchase";
import Layout from "../../src/components/layout";
import { getRequest, postRequest } from "../../src/services/api";
import setApiHeaders from "../../src/services/setApiHeaders";
import { Order } from "../../src/Types";

type OrderProps = {
  orders: Order[];
};

export default function MyOrders(props: OrderProps) {
  const [orders, setOrders] = useState<Order[]>(props.orders);
  const router = useRouter();

  const handleOrdersReload = async () => {
    try {
      setApiHeaders();
      const { data, status } = await getRequest<Order[]>("order");

      if (status !== 200) {
        setOrders([]);
      } else {
        setOrders(data);
      }
    } catch (error) {
      setOrders([]);
    }
  };

  return (
    <Layout title="Meus pedidos">
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 87px)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: orders.length ? "20px" : "0",
        }}
      >
        {orders.length ? (
          orders.map((order) => (
            <CardMyPurchase
              key={order.id}
              info={order}
              handleOrdersReload={handleOrdersReload}
            />
          ))
        ) : (
          <Container
            sx={{
              minHeight: "calc(100vh - 87px)",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                alignItems: "center",
                backgroundColor: "#0000005c",
                color: "white",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                height: { xs: "200px", sm: "250px" },
                justifyContent: "center",
                padding: "20px",
                width: { xs: "350px", sm: "450px" },
              }}
            >
              <CardContent>
                <Typography
                  component="h3"
                  variant="h3"
                  sx={{ fontSize: "30px", fontWeight: "bold" }}
                >
                  Não possui nenhuma compra
                </Typography>
              </CardContent>
              <Button
                sx={{ fontSize: "18px", fontWeight: "bold", width: "50%" }}
                variant="contained"
                fullWidth
                onClick={() => router.push(`/pizzas`)}
              >
                comprar
              </Button>
            </Card>
          </Container>
        )}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    setApiHeaders(ctx);
    const { data, status } = await getRequest<Order[]>("order");

    if (status !== 200)
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };

    return {
      props: { orders: data },
    };
  } catch (error) {
    return {
      props: { orders: [] },
    };
  }
};
