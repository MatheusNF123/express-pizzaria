import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useRouter } from 'next/router'

import { Pizza } from "../Types";

type PizzaCardProps = {
  info: Pizza;
};

export default function PizzaCard({
  info: { id, img, flavor },
}: PizzaCardProps) {
  const router = useRouter();

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
          <Button variant="contained" onClick={() => router.push('/')}>
            Comprar
          </Button>
          <Button variant="contained" onClick={() => router.push(`/pizzas/${id}`)}>
            Detalhes
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
