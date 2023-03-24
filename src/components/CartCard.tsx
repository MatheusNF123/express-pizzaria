import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Container,
  Divider,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { CartPizzas, PurchaseInfo } from "../Types";
import CartItemModalForm from "./cartItemModalForm";
import setApiHeaders from "../services/setApiHeaders";
import { deleteRequest, putRequest } from "../services/api";

type CartCardProps = {
  info: CartPizzas;
  cartId?: string;
  handleCartReload: () => Promise<void>;
};

export default function CartCard({
  info,
  cartId,
  handleCartReload,
}: CartCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const { id, quantity, border, size, pizza } = info;
  const { flavor, img, price } = pizza;

  const handleCartItemDeletion = async () => {
    setApiHeaders();
    await deleteRequest(`/cart/${cartId}/item/${id}`);

    await handleCartReload();
  };

  const handleCartItemUpdate = async (cartItemInfo: PurchaseInfo) => {
    setApiHeaders();
    await putRequest(`/cart/${cartId}/item/${id}`, cartItemInfo);

    await handleCartReload();
    setOpenModal(false);
  };

  return (
    <Card elevation={0} sx={{ display: "flex", backgroundColor: "#0000005c" }}>
      <Container maxWidth="xl">
        <Box sx={{ color: "white", display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{
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
                    width: "120px",
                    height: "120px",
                    border: "2px solid black",
                    borderRadius: "10px",
                  }}
                  image={img}
                  title="Pizza Image"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ mb: 1, color: "primary.main" }}
                >
                  {flavor}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography component="div" variant="subtitle2">
                    Tamanho
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: "center",
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: "5px",
                      }}
                    >
                      {size}
                    </Typography>
                  </Typography>

                  <Typography component="div" variant="subtitle2" sx={{    display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"}}>
                    Borda
                    <Typography
                      variant="subtitle2"
                      sx={{
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: "5px",
                        padding: "0 10px",
                        
                      }}
                    >
                      {border ? "Sim" : "Não"}
                    </Typography>
                  </Typography>

                  <Typography component="div" variant="subtitle2">
                    quantidade
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: "center",
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: "5px",
                      }}
                    >
                      {" "}
                      {quantity} uni.{" "}
                    </Typography>
                  </Typography>
                  <Typography
                    component="div"
                    variant="subtitle2"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    Preço
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: "center",
                        border: "1px solid",
                        borderColor: "primary.main",
                        borderRadius: "5px",
                        padding: "0 10px",
                      }}
                    >
                      R$ {price}{" "}
                    </Typography>
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    display: "flex",
                    padding: { xs: "5px 0px" },
                  }}
                >
                  <Box>
                    <Button
                      aria-label="Editar pedido do carrinho"
                      onClick={() => setOpenModal(true)}
                    >
                      Editar
                    </Button>
                  </Box>
                  <Box title="Excluir">
                    <Button
                      aria-label="Excluir pedido do carrinho"
                      onClick={() => handleCartItemDeletion()}
                    >
                      Remover pizza
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Container>
      <CartItemModalForm
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleCartItemUpdate={handleCartItemUpdate}
        info={info}
      />
    </Card>
  );
}
