import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { Pizza } from "../Types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PizzaUpdateModalForm from "./pizzaUpdateModalForm";
import setApiHeaders from "../services/setApiHeaders";
import { deleteRequest, putRequest } from "../services/api";

type AdminPizzaCardProps = {
  pizza: Pizza;
  handlePizzasReload: () => Promise<void>;
};

export default function AdminPizzaCard({
  pizza,
  handlePizzasReload,
}: AdminPizzaCardProps) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { id, flavor, price, img, ingredients, type } = pizza;

  const handlePizzaUpdate = async (pizzaInfo: Omit<Pizza, "id">) => {
    setApiHeaders();
    await putRequest(`admin/pizza`, { id, ...pizzaInfo });

    await handlePizzasReload();
    setOpenUpdateModal(false);
  };

  const handlePizzaDeletion = async () => {
    setApiHeaders();
    await deleteRequest(`admin/pizza/${id}`);

    await handlePizzasReload();
  };

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          backgroundColor: "#0000005c",
          color: "white",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", sm: 200, objectFit: "cover" },
            height: { xs: 150, sm: 222 },
          }}
          image={img}
        />
        <CardContent sx={{ width: "100%", padding: "12px !IMPORTANT" }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                alignItems: "center",
                color: "primary.main",
                display: "flex",
                fontSize: "35px",
                fontWeight: "bold",
                width: "100%",
              }}
              variant="h5"
              component="div"
            >
              {flavor}
            </Typography>
            <CardActions
              disableSpacing
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Tooltip title="Editar">
                <IconButton
                  aria-label="Editar Pizza"
                  onClick={() => setOpenUpdateModal(true)}
                >
                  <EditIcon sx={{ color: "white" }} fontSize="medium" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Excluir">
                <IconButton
                  aria-label="Excluir Pizza"
                  onClick={() => handlePizzaDeletion()}
                >
                  <DeleteIcon sx={{ color: "white" }} fontSize="medium" />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Box>
          <Divider sx={{ marginBottom: "5px", background: "white" }} />

          <Box
            sx={{
              display: { xs: "column", sm: "flex" },
              alignItems: "center",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "50%" }, marginRight: "5px" }}>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ fontSize: { xs: "25px", sm: "20px" } }}
              >
                <Typography
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    fontSize: { xs: "25px", sm: "20px" },
                  }}
                  component="span"
                >
                  Categoria:{" "}
                </Typography>
                {type}
              </Typography>
              <Typography
                sx={{
                  marginBottom: { xs: "4px", sm: "0px" },
                  fontSize: { xs: "25px", sm: "20px" },
                }}
                variant="body1"
                component="div"
              >
                <Typography
                  component="span"
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    fontSize: { xs: "25px", sm: "20px" },
                  }}
                >
                  Preço:{" "}
                </Typography>
                {price}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  fontSize: { xs: "25px", sm: "20px" },
                }}
              >
                Ingredientes:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: { xs: "nowrap", sm: "wrap" },
                  flexDirection: "column",
                  height: { xs: "100%", sm: "103px" },
                }}
              >
                {ingredients?.map((el, index) => (
                  <Typography
                    flexWrap="wrap"
                    component="li"
                    marginRight={1}
                    variant="body2"
                    key={index + el}
                    sx={{ fontSize: { xs: "25px", sm: "20px" } }}
                  >
                    {el}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <PizzaUpdateModalForm
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        handlePizzaUpdate={handlePizzaUpdate}
        info={pizza}
      />
    </Grid>
  );
}
