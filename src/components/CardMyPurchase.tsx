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
  Container
} from "@mui/material";
import { useRouter } from "next/router";

import { Pizza } from "../Types";

type CartCardProps = {
  info: number;
};

export default function CardMyPurchase({ info }: CartCardProps) {
  const router = useRouter();

  return (
    <Box sx={{backgroundColor: 'white', padding: '10px 0px'}}>
       <Container maxWidth="xl">
       <Typography sx={{marginBottom: '5px'}} variant="h6">3 de dezembro de 2022 </Typography>
    <Divider />
    <Card elevation={0} sx={{display: 'flex', /* alignItems: 'center' */} }>
      <CardMedia
      sx={{
        width: "80px",
        height: "80px",
        border: "2px solid black",
        // margin: "20px 5px 20px 20px",
      }}
        // image={img}
        title="Pizza Image"
      />
      <CardContent>
        <Typography variant="h6"> pizza de qualquer coisa{info}</Typography>
        <Typography>Quantidate</Typography>
      </CardContent>
      <CardActions
       sx={{
        display: "flex",        
      }}>
        <Box
            sx={{
              display: "flex",
              flexDirection: 'column', 
              gap: "4px",
            }}>
        <Button variant="contained" onClick={() => router.push("/")}>
          ver compra
        </Button>
        <Button
          variant="contained"              
          onClick={() => router.push(`/`)}
          >
          comprar novamente
        </Button>
        </Box>
      </CardActions>
     
    </Card>
    </Container>
    </Box>
  );
}
