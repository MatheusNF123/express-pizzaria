import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box
} from "@mui/material";
import { useRouter } from "next/router";

import { Pizza } from "../Types";

type CartCardProps = {
  info: number;
};

export default function CartCard({ info }: CartCardProps) {
  const router = useRouter();

  return (
    <Card>
      <CardMedia
        // image={img}
        title="Pizza Image"
      />
      <CardContent>
        <Typography variant="h6">{info}</Typography>
      </CardContent>
      <CardActions>
      </CardActions>
      <Typography>Quantidate</Typography>
    </Card>
  );
}
