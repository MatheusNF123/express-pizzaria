import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
} from "@mui/material";

import CartCard from "../../src/components/CartCard";
import Layout from "../../src/components/layout";
import { getRequest, postRequest } from "../../src/services/api";
import setApiHeaders from "../../src/services/setApiHeaders";
import { userContext } from "../../src/context/userProvider";
import { Cart as CartType } from "../../src/Types";
import getCartData from "../../src/services/getCartData";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

type CartProps = {
  cart: CartType | null;
};

export default function Cart(props: CartProps) {
  const router = useRouter();
  const [cart, setCart] = useState<CartType | null>(props.cart);
  const { handleCartQuantity, cartQuantity } = useContext(userContext);

  const handleCartReload = async () => {
    const { quantity, data } = await getCartData();
    setCart(data);
    handleCartQuantity(quantity);
  };

  const handlePurchaseFinished = async () => {
    const pizzas = cart?.cartPizzas.map(
      ({ pizza, border, quantity, size }) => ({
        pizzaId: pizza.id,
        border,
        quantity,
        size,
      })
    );
    setApiHeaders();
    await postRequest("/order", {
      cartId: cart?.id,
      pizzas,
    });

    await handleCartReload();
  };

  return (
    <Layout title="Carrinho">
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 87px)",
          width: "100%",
          display: "flex",
        }}
      >
        {cart ? (
          <Box
            sx={{
              color: "white",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "normal" },
              gap: "30px",
              margin: "30px 0",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: { xs: "100%", md: "70%" },
              }}
            >
              {cart?.cartPizzas.map((item) => (
                <CartCard
                  info={item}
                  cartId={props.cart?.id}
                  handleCartReload={handleCartReload}
                  key={item.id}
                />
              ))}
            </Box>
            <Box
              sx={{
                backgroundColor: "#0000005c",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                height: "265px",
                justifyContent: "space-evenly",
                padding: "20px",
                width: { xs: "60%", md: "30%" },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: "bold" }}>Total:</Typography>
                <Typography>R$ {cart?.totalPrice}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: "bold" }}>Produtos: </Typography>
                <Typography>{cartQuantity}</Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => router.push("/pizzas")}
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Continuar comprando
              </Button>

              <Button
                variant="contained"
                onClick={handlePurchaseFinished}
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Finalizar compra
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              alignItems: "center",
              flex: "1",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Card
              sx={{
                alignItems: "center",
                backgroundColor: "#0000005c",
                color: "white",
                display: "flex",
                flexDirection: "column",
                height: "350px",
                justifyContent: "space-around",
                padding: "20px",
                width: "550px",
              }}
            >
              <Typography
                sx={{ fontSize: "2rem", fontWeight: "bold" }}
                component="h1"
              >
                Carrinho vazio
              </Typography>
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: "80px",
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  width: "70%",
                }}
              >
                <Button
                  sx={{
                    width: "100%",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                  onClick={() => router.push("/user/meus_pedidos")}
                >
                  Meus Pedidos
                </Button>
                <Button
                  sx={{
                    width: "100%",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                  onClick={() => router.push("/pizzas")}
                >
                  Continuar comprando
                </Button>
              </Box>
            </Card>
          </Box>
        )}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    setApiHeaders(ctx);
    const { data, status } = await getRequest<CartType>("/cart");

    if (status === 401)
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };

    if (status === 200)
      return {
        props: { cart: data },
      };

    return {
      props: { cart: null },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
