import { GetServerSideProps } from "next";
import { Container } from "@mui/material";

import CartCard from "../../src/components/CartCard";
import Layout from "../../src/components/layout";
import { getRequest } from "../../src/services/api";

const cartItems = [1, 2, 3, 4, 5, 6, 7];

type CartProps = {
  cart: any;
};

export default function Cart(props: CartProps) {
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
        {cartItems.map((n) => (
          <CartCard info={n} key={n} />
        ))}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data, status } = await getRequest<string>("/cart");
    // console.log("data", data);
    // console.log("status", status); 
    // if (status === 401)
    //   return {
    //     redirect: {
    //       permanent: false,
    //       destination: "/login",
    //     },
    //   };

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
