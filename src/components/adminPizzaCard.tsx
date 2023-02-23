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
import PizzaModalForm from "./pizzaModalForm";

type AdminPizzaCardProps = {
  pizza: Pizza;
};

export default function AdminPizzaCard({ pizza }: AdminPizzaCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const { id, flavor, price, img, ingredients, type } = pizza;

  const handlePizzaUpdate = async (pizzaInfo: Omit<Pizza, "id">) => {
    console.log('wdwadawacsada');
    
    // setApiHeaders();
    // await putRequest(`/cart/${cartId}/item/${id}`, cartItemInfo);

    // await handleCartReload();
    setOpenModal(false);
  };

  return (
    <Grid item xs={12}>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{
            width: {xs: 100, sm: 200},
            height: {xs: 120, sm: 220},
          }}
          image={img}
        />
        <CardContent sx={{ width: "100%", padding: "12px" }}>


          <Box sx={{ display: "flex"}}>
            <Typography
              sx={{ width: "100%", display: "flex", alignItems: "center" }}
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
                  onClick={() => setOpenModal(true)}
                >
                  <EditIcon fontSize="medium" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Excluir">
                <IconButton
                  aria-label="Excluir Pizza"
                  // onClick={() => setOpenModal(true)}
                >
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Box>
          <Divider sx={{ marginBottom: "5px", background: "#e2e2e2" }} />

          <Box
            sx={{ display: { xs: "column", sm: "flex" }, alignItems: "center" }}
          >
            <Box sx={{ width: "40%", marginRight: "5px" }}>
              <Typography gutterBottom variant="body1" component="div">
                Categoria: {type}
              </Typography>
              <Typography variant="body1" component="div">
                Preço: {price}
              </Typography>
            </Box>
            <Box>
              Ingredientes:
              <Box sx={{ 
                flexWrap: {xs: "nowrap",sm:"wrap"},
                display: "flex",
                flexDirection: "column",
                height: "100px"}}
              
              >
                {ingredients?.map((el, index) => (
                  <Typography
                    flexWrap="wrap"
                    component="li"
                    marginRight={1}
                    variant="body2"
                    color="text.secondary"
                    key={index + el}
                  >
                    {el}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <PizzaModalForm
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handlePizzaUpdate={handlePizzaUpdate}
        info={pizza}
      />
    </Grid>
  );
}
