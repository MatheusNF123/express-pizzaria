import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

import { Pizza } from "../Types";
import NextLink from "./NextLink";

type PizzaCardProps = {
  info: Pizza;
};

export default function PizzaCard({
  info: { id, img, flavor },
}: PizzaCardProps) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          backgroundColor: "#f96d00",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardMedia
          image={img}
          title="Pizza Image"
          sx={{
            paddingTop: "56.25%",
          }}
        />
        <CardContent>
          <Typography variant="h6">{flavor}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">
            <NextLink path="/"> Comprar</NextLink>
          </Button>
          <Button variant="contained">
            <NextLink path={`/pizzas/${id}`}> Detalhes</NextLink>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
