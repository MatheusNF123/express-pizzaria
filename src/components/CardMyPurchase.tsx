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
import { formatDate } from "../utils/formatDate"
import verifyDate from "../utils/verifyDate"

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
    <Container >
      <Card elevation={0} sx={{ display: "flex" }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ m: 1, fontWeight: 'bold' }} component="span">
                {formatDate(new Date(date))}
              </Typography>
              <Typography sx={{ display: 'flex', m: 1, fontWeight: 'bold' }} component="span">
                <Typography>Total  R$: </Typography> {totalPrice}
              </Typography>
            </Box>
            <Divider />
            {ordersPizzas.map((ordersPizza) => (
              <CardContent key={ordersPizza.id} sx={{ display: "flex", flexDirection: {xs: 'column', sm: 'row'} , width: '100%' }} >
                <Box sx={{ mr: 1 }}>
                  <CardMedia
                    sx={{
                      width: "100px",
                      height: "100px",
                      border: "2px solid black",
                      // margin: "20px 5px 20px 20px",
                    }}
                    image={ordersPizza.pizza.img}
                    title="Pizza Image"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {ordersPizza.pizza.flavor}
                  </Typography>
                  <Typography variant="subtitle2">
                    {ordersPizza.quantity} uni.
                  </Typography>
                  <Typography sx={{ mb: 1 }} variant="subtitle2">
                    R$ {ordersPizza.pizza.price}
                  </Typography>
                  <Box sx={{ flex: 1, display: { md: 'flex', lg: 'none' } }}>
                    Status:
                    <Typography sx={{ color: status === 'Comprado' ? '#13AD5D' : 'red' }}
                      component="span"> {status}</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: {xs :'none', sm: 'none', md: 'none', lg: 'flex' } }}>
                  Status:
                  <Typography sx={{ color: status === 'Comprado' ? '#13AD5D' : 'red' }}
                    component="span"> {status}</Typography>
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
                      sx={{ fontSize: '12px' }}
                      variant="contained"
                      onClick={() => router.push(`/pizzas/${ordersPizza.pizza.id}`)}
                    >
                      comprar novamente
                    </Button>

                    <Button
                      sx={{ fontSize: '12px' }}
                      disabled={verifyDate(date)}
                      variant="contained"
                      onClick={() => router.push("/")}
                    >
                      cancelar
                    </Button>

                  </Box>
                </CardActions>
              </CardContent>
            ))}

          </Box>
        </Container>
      </Card>
    </Container>
  );
}
