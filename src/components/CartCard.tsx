import { useRouter } from "next/router";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Container,
  Divider,
  Tooltip,
  IconButton
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

import { CartPizzas } from "../Types";

type CartCardProps = {
  info: CartPizzas;
  handleCartItemDeletion: (itemId: string) => void;
};

export default function CartCard({ info, handleCartItemDeletion }: CartCardProps) {
  const router = useRouter();
  const { id, quantity, border, size, pizza } = info;
  const { flavor, img, price } = pizza;

  return (
    <Container>
      <Divider color="white" />
      <Card elevation={0} sx={{ display: "flex", backgroundColor: 'inherit' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                      width: '120px',
                      height: '120px',
                      border: "2px solid black",
                    }}
                    image={img}
                    title="Pizza Image"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {flavor}
                  </Typography>
                  <Typography variant="subtitle2">
                    {quantity} uni.
                  </Typography>
                  <Typography variant="subtitle2">
                    {border ? 'Tem borda' : 'Sem borda'}
                  </Typography>
                  <Typography variant="subtitle2">
                    {size}
                  </Typography>
                  <Typography sx={{ mb: 1 }} variant="subtitle2">
                    R$ {price}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    display: "flex",
                    padding: { xs: "5px 0px", },
                  }}
                >
                  <Tooltip title="Excluir">
                    <IconButton
                      aria-label="Excluir pizza"
                      onClick={() => handleCartItemDeletion(id)}
                    >
                      <DeleteIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Box>
            </CardContent>
          </Box>
        </Container>
      </Card>
    </Container>
  );
}
