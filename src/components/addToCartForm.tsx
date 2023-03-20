import { useContext } from "react";
import {
  Button,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Box,
  Typography,
  FormControl,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { userContext } from "../context/userProvider";

type AddToCartFormProps = {
  pizzaId: string;
};

export default function AddToCartForm({ pizzaId }: AddToCartFormProps) {
  const { handlePurchase } = useContext(userContext);
  const router = useRouter();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        size: "médio",
        border: false,
        quantity: 1,
      }}
      onSubmit={async ({ size, quantity, border }) => {
        await handlePurchase({
          pizzaId,
          size,
          quantity,
          border,
        });
      }}
    >
      {(props) => (
        <Form style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography>Tamanho:</Typography>
            <FormControl variant="standard">
              <Field
                labelId="select-size-label"
                name="size"
                // label="Tamanho"
                sx={{
                  color: "white",
                  height: "30px",
                  border: "none",
                }}
                as={Select}
              >
                <MenuItem value="médio">Médio</MenuItem>
                <MenuItem value="grande">Grande</MenuItem>
                <MenuItem value="pequeno">Pequeno</MenuItem>
              </Field>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography>Borda:</Typography>
            <Field
              name="border"
              // label="Borda"
              size="medium"
              type="checkbox"
              sx={{
                color: "white",
              }}
              as={Checkbox}
              variant="outlined"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography>Quantidade:</Typography>
            <Field
              name="quantity"
              variant="standard"
              type="number"
              helperText={<ErrorMessage name="quantity" />}
              error={props.errors.quantity}
              sx={{
                color: "white",
                borderColor: "white",
                width: "80px",
                // "& input:valid + fieldset": {
                //   borderColor: "white",
                //   borderWidth: 2,
                // },
              }}
              as={TextField}
              InputProps={{
                style: { color: "white", borderColor: "white" },
                inputProps: {
                  min: 1,
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // marginTop: "15px",
              padding: '10px 0',
            }}
          >
            <Button
              variant="contained"
              // sx={{backgroundColor: '#FFCC33', color: 'black'}}
              onClick={() => router.push(`/pizzas/${pizzaId}`)}
            >
              Detalhes
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Adicionar ao carrinho <AddShoppingCartIcon fontSize="small"/>
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
