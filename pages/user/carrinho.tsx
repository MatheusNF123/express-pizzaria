import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";

import CartCard from "../../src/components/CartCard";
import Layout from "../../src/components/layout";
import { deleteRequest, getRequest } from "../../src/services/api";
import setApiHeaders from "../../src/services/setApiHeaders";
import { userContext } from "../../src/context/userProvider";
import { Cart as CartType } from "../../src/Types";
import getCartQuantity from "../../src/services/getCartQuantity";

type CartProps = {
  cart: CartType;
};

export default function Cart({ cart: { id, totalPrice, cartPizzas } }: CartProps) {
  const { handleCartQuantity } = useContext(userContext);

  const handleCartItemDeletion = async (itemId: string) => {
    setApiHeaders();
    await deleteRequest(`/cart/${id}/item/${itemId}`);
    // pegar dados do carrinho depois de ter deletado
    const quantity = await getCartQuantity();
    handleCartQuantity(quantity);
  }

  return (
    <Layout title="Carrinho">
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            color: 'white',
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ display: "flex", m: 1, fontWeight: "bold" }}
            component="span"
          >
            <Typography>Total R$: </Typography> {totalPrice}
          </Typography>
        </Box>
        {/* <Divider color="white" /> */}
        {cartPizzas.map((item) => (
          <CartCard info={item} handleCartItemDeletion={handleCartItemDeletion} key={item.id} />
        ))}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    setApiHeaders(ctx);

    const { data, status } = await getRequest<CartType>("/cart");
    console.log("cart", status, data);

    if (status === 401)
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };

    return {
      props: { cart: data },
    };
  } catch (error) {
    console.log("error", error);

    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
