import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useRouter } from "next/router";

import { Order } from "../Types";
import { formatDate } from "../utils/formatDate";
import verifyDate from "../utils/verifyDate";
import { patchRequest } from "../services/api";
import setApiHeaders from "../services/setApiHeaders";

type CardMyPurchaseProps = {
  info: Order;
  handleOrdersReload: () => Promise<void>;
};

export default function CardMyPurchase({
  info,
  handleOrdersReload,
}: CardMyPurchaseProps) {
  const router = useRouter();
  const { date, ordersPizzas, status, totalPrice, id } = info;

  const cancelOrder = async () => {
    try {
      setApiHeaders();
      await patchRequest(`order/${id}`);
      await handleOrdersReload();
    } catch {
      return alert(`Erro interno, volte mais tarde :)`);
    }
  };

  return (
    <Container>
      <Card
        elevation={0}
        sx={{ bgcolor: "#0000005c", color: "white", display: "flex" }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                m: 1,
              }}
            >
              <Typography sx={{ m: 1, fontWeight: "bold" }} component="span">
                {formatDate(new Date(date))}
              </Typography>
              <Typography
                sx={{ display: "flex", m: 1, fontWeight: "bold" }}
                component="span"
              >
                <Typography>Total R$: </Typography> {totalPrice}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              {ordersPizzas.map((ordersPizza) => (
                <>
                  <CardContent
                    key={ordersPizza.id}
                    sx={{
                      bgcolor: "#1b1b1b",
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flex: "1",
                      }}
                    >
                      <Box sx={{ mr: 1 }}>
                        <CardMedia
                          sx={{
                            width: "170px",
                            height: "170px",
                            border: "1px solid #FFCC33",
                            borderRadius: "10px",
                          }}
                          image={ordersPizza.pizza.img}
                          title={`Pizza de ${ordersPizza.pizza.flavor}`}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{ mb: 1, color: "primary.main" }}
                        >
                          {ordersPizza.pizza.flavor}
                        </Typography>
                        <Typography variant="subtitle2">
                          Quantidade: {ordersPizza.quantity}
                        </Typography>
                        <Typography variant="subtitle2">
                          Tamanho: {ordersPizza.size}
                        </Typography>
                        <Typography variant="subtitle2">
                          Borda: {ordersPizza.border ? "Sim" : "Não"}
                        </Typography>
                        <Typography sx={{ mb: 1 }} variant="subtitle2">
                          Preço R$ {ordersPizza.pizza.price}
                        </Typography>
                        <Box
                          sx={{
                            flex: 1,
                            display: {
                              xs: "flex",
                              sm: "none",
                              md: "none",
                              lg: "none",
                            },
                          }}
                        >
                          Status:
                          <Typography
                            sx={{
                              color: status === "Comprado" ? "#13AD5D" : "red",
                            }}
                            component="span"
                          >
                            {status}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <CardActions
                      sx={{
                        display: "flex",
                        padding: { xs: "5px 0px" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: { xs: "100%" },
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <Button
                          sx={{
                            fontSize: "18px",
                            padding: "5px 15px",
                            fontWeight: "bold",
                            mt: { xs: "10px", sm: "none" },
                          }}
                          variant="contained"
                          onClick={() =>
                            router.push(`/pizzas/${ordersPizza.pizza.id}`)
                          }
                        >
                          comprar novamente
                        </Button>
                      </Box>
                    </CardActions>
                  </CardContent>
                </>
              ))}
            </Box>

            <CardActions
              sx={{
                alignItems: "center",
                display: "flex",
                padding: 0,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                    md: "flex",
                    lg: "flex",
                  },
                  alignItems: "center",
                  m: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "25px" }}>Status:</Typography>
                  <Typography
                    sx={{
                      color: status === "Comprado" ? "#13AD5D" : "red",
                      fontSize: "25px",
                    }}
                    component="span"
                  >
                    {status}
                  </Typography>
                </Box>
              </Box>
              <Button
                sx={{
                  width: { xs: "100%", sm: "180px" },
                  fontSize: "18px",
                  padding: "3px 15px",
                  fontWeight: "bold",
                  "&:disabled": {
                    color: "#9e9e9e4e",
                    bgcolor: "#9e9e9e2b",
                  },
                  mt: { xs: "15px", sm: "none" },
                  mb: { xs: "15px", sm: "none" },
                }}
                disabled={verifyDate(date, status)}
                variant="contained"
                onClick={cancelOrder}
                color="error"
              >
                cancelar pedido
              </Button>
            </CardActions>
          </Box>
        </Container>
      </Card>
    </Container>
  );
}
