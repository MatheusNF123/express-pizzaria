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
    <Card elevation={0} sx={{display: 'flex'} }>
       <Container maxWidth="xl">
    <Box sx={{display: "flex", flexDirection: "column"}}>
       <Typography sx={{m: 1}} component="div">3 de dezembro de 2022 </Typography>
    <Divider />
      <CardContent sx={{display: 'flex', width: '100%'}}>
        <Box sx={{mr: 1}}>
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
        <Box sx={{flex: 1}}>
        <Typography variant="h6" component="div" sx={{mb: 1}}>pizza de qualquer coisa {info}</Typography>
        <Typography variant="subtitle2">Quantidate: 2</Typography>
        <Typography variant="subtitle2">Price uni: 29,90</Typography>
        </Box>
        <Box sx={{flex: 1}}>
        <Typography component="span">Status: Entregue</Typography>
        </Box>
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
      </CardContent>
     
    </Box>
    </Container>
    </Card>
  );
}
