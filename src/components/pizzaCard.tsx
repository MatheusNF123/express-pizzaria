import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";

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
      {/* <Paper elevation={3}> */}
      <Card
        elevation={10}
        sx={{
          backgroundColor: "#303030",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          color: "white",
          transition: ".2s",
          borderRadius: "8px",
          borderBottom: "2px solid #7c7c7c",
          "&:hover": {
            transform: "scale(1.05)",
            // boxShadow: "1px 1px 10px #ffffff37",
            borderBottom: "2px solid #e76e0abd",
          },
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
          <Button variant="contained" onClick={() => router.push("/")}>
            Comprar
          </Button>
          <Button
            variant="contained"
            onClick={() => router.push(`/pizzas/${id}`)}
          >
            Detalhes
          </Button>
        </CardActions>
      </Card>
      {/* </Paper> */}
    </Grid>
  );
}
