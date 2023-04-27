import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { getRequest } from "../../src/services/api";
import Header from "../../src/components/header";
import { Pizza } from "../../src/Types";
import Image from "next/image";
import Layout from "../../src/components/layout";
import AddToCartForm from "../../src/components/addToCartForm";

type PizzaDetailsProps = {
  pizza: Pizza;
};

export default function PizzaDetails({
  pizza: { id, img, flavor, ingredients, price, type },
}: PizzaDetailsProps) {
  return (
    <Layout title="Detalhes da pizza">
      <Box
        sx={{
          minHeight: "calc(100vh - 100px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Stack
          maxWidth="xl"
          direction={{ xs: "column", md: "row" }}
          flex={1}
          justifyContent="space-between"
          spacing={1}
        >
          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={img}
              alt={`Pizza de ${flavor}`}              
              width={400}
              height={400}
              style={{ borderRadius: "10px", border: "1px solid #FFCC33" }}
            />
          </Box>
          <Box
            flex={1}
            sx={{
              alignItems: { xs: "center", md: "flex-start" },
              color: "white",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{ alignSelf: "center", color: "#FFCC33" }}
            >
              {flavor}
            </Typography>
            <Typography variant="h6">
              <Typography
                variant="h6"
                component="span"
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                Tipo:{" "}
              </Typography>
              {type}
            </Typography>
            <Typography variant="h6">
              <Typography
                variant="h6"
                component="span"
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                Preço: R${" "}
              </Typography>
              {price}
            </Typography>
            <Box>
              <AddToCartForm pizzaId={id} />
            </Box>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "primary.main",
                width: "100%",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                alignItems: "center",
                position: "relative",
                mt: "20px",
              }}
            >
              <Typography
                component="ul"
                variant="h6"
                sx={{
                  padding: "0 5px",
                  backgroundColor: "background.default",
                  color: "primary.main",
                  fontWeight: "bold",
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%)",
                  top: "-22px",
                }}
              >
                Ingredientes
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "center" },
                }}
              >
                {ingredients.map((item) => (
                  <Typography
                    key={item}
                    component="li"
                    variant="h6"
                    sx={{ listStyle: "none" }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await getRequest(`pizzas/${ctx.query.id}`);

  return {
    props: { pizza: data },
  };
};
