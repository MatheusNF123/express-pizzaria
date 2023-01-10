import { Container } from "@mui/material";
import CardMyPurchase from "../src/components/CardMyPurchase";
import Layout from "../src/components/layout";

const Items = [1, 2, 3, 4, 5, 6, 7];

export default function meusPedidos() {
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
        }}>
        {Items.map((n) => (
          <CardMyPurchase info={n} key={n} />
        ))}
      </Container>
    </Layout>
  );
}
