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
                flex: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { sm: "center" },
              }}
            >
              <Box sx={{ mr: 1 }}>
                <CardMedia
                  sx={{
                    width: { xs: 300, sm: 185 },
                    height: 185,
                    border: "2px solid black",
                    borderRadius: "10px",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                  image={img}
                  title={`Pizza de ${flavor}`}
                />
              </Box>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    mb: 1,
                    color: "primary.main",
                    margin: { xs: "10px auto", sm: "1px" },
                    fontSize: "30px",
                  }}
                >
                  {flavor}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "20px",
                  }}
                >
                  <Typography
                    component="div"
                    variant="subtitle2"
                    sx={{ fontSize: { xs: "22px", sm: "24px" } }}
                  >
                    Tamanho
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
                      {size}
                    </Typography>
                  </Typography>

                  <Typography
                    component="div"
                    variant="subtitle2"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: { xs: "24px", sm: "22px" },
                    }}
                  >
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

                  <Typography
                    component="div"
                    variant="subtitle2"
                    sx={{ fontSize: { xs: "24px", sm: "22px" } }}
                  >
                    quantidade
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
                      {" "}
                      {quantity} uni.{" "}
                    </Typography>
                  </Typography>
                  <Typography
                    component="div"
                    variant="subtitle2"
                    sx={{
                      fontSize: { xs: "26px", sm: "24px" },
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
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
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: { xs: "center", sm: "inherit" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "inherit" },
                      mb: { xs: 2, sm: "inherit" },
                    }}
                  >
                    <Button
                      fullWidth
                      sx={{ padding: "2px 16px" }}
                      variant="contained"
                      aria-label="Editar pedido do carrinho"
                      onClick={() => setOpenModal(true)}
                    >
                      Editar
                    </Button>
                  </Box>
                  <Box
                    title="Excluir"
                    sx={{ width: { xs: "100%", sm: "inherit" } }}
                  >
                    <Button
                      sx={{
                        padding: "2px 16px",
                        marginLeft: { xs: -0.5, sm: "inherit" },
                      }}
                      fullWidth
                      variant="contained"
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
