import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Divider,
  Container,
} from "@mui/material";
import { useRouter } from "next/router";

import { Order } from "../Types";

export default function CardMyPurchase({
  date,
  id,
  ordersPizzas,
  status,
  totalPrice,
  user,
}: Order) {
  const router = useRouter();

  return (
    <>
      {ordersPizzas.map((ordersPizza) => (
        <Card key={ordersPizza.id} elevation={0} sx={{ display: "flex" }}>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ m: 1 }} component="div">
                  {String(date)}
                </Typography>
                <Typography sx={{ m: 1 }} component="div">
                  {totalPrice}
                </Typography>
              </Box>
              <Divider />
              <CardContent sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ mr: 1 }}>
                  <CardMedia
                    sx={{
                      width: "100px",
                      height: "100px",
                      border: "2px solid black",
                      // margin: "20px 5px 20px 20px",
                    }}
                    // image={img}
                    title="Pizza Image"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {ordersPizza.pizza.id}
                  </Typography>
                  <Typography variant="subtitle2">
                    {ordersPizza.quantity}
                  </Typography>
                  <Typography variant="subtitle2">
                    {ordersPizza.pizza.price}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography component="span">Status: {status}</Typography>
                </Box>
                <CardActions
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => router.push("/")}
                    >
                      ver compra
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => router.push(`/pizzas/${ordersPizza.pizza.id}`)}
                    >
                      comprar novamente
                    </Button>
                  </Box>
                </CardActions>
              </CardContent>
            </Box>
          </Container>
        </Card>
      ))}
    </>
  );
}
