import { Container } from "@mui/material";
import CartCard from "../src/components/CartCard";
import Layout from "../src/components/layout";

const cartItems = [1, 2, 3, 4, 5, 6, 7];

export default function Cart() {
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
        }}>
        {cartItems.map((n) => (
          <CartCard info={n} key={n} />
        ))}
      </Container>
    </Layout>
  );
}
