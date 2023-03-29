import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
} from "@mui/material";
import { useContext } from "react";
import { userContext } from "../context/userProvider";

import { Pizza } from "../Types";
import AddToCartForm from "./addToCartForm";

type PizzaCardProps = {
  info: Pizza;
};

export default function PizzaCard({
  info: { id, img, flavor, price },
}: PizzaCardProps) {
  const { handlePurchase } = useContext(userContext);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        elevation={10}
        sx={{
          backgroundColor: "#0000005c",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          color: "white",
          transition: ".2s",
          borderRadius: "8px",
          borderBottom: "2px solid #0000005c",
          "&:hover": {
            transform: "scale(1.05)",
            borderBottom: "2px solid #FFCC33",
          },
        }}
      >
        <CardMedia
          image={img}
          title={`Pizza de ${flavor}`}
          sx={{
            paddingTop: "56.25%",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{flavor}</Typography>
          <Typography sx={{ color: "#FFCC33" }} component="span">
            R$: {price}
          </Typography>
        </CardContent>
        <CardActions>
          <AddToCartForm hasDetailsButton pizzaId={id} />
        </CardActions>
      </Card>
    </Grid>
  );
}
