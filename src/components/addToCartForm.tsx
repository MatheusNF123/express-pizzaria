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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { userContext } from "../context/userProvider";
import { Height } from "@mui/icons-material";

type AddToCartFormProps = {
  pizzaId: string;
  hasDetailsButton?: boolean;
};

export default function AddToCartForm({
  pizzaId,
  hasDetailsButton = false,
}: AddToCartFormProps) {
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

            <Field
              labelId="select-size-label"
              name="size"
              sx={{
                color: "white",
                height: "40px",
                boxShadow: "0 0 4px rgba(252, 252, 15, 0.445)",
                "&:focus": {
                  outline: "none",
                },
                margin: "10px 0"
              }}
              as={Select}
            >
              <MenuItem value="médio">Médio</MenuItem>
              <MenuItem value="grande">Grande</MenuItem>
              <MenuItem value="pequeno">Pequeno</MenuItem>
            </Field>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography>Com borda:</Typography>
            <Field
              name="border"
              // label="Borda"
              size="medium"
              type="checkbox"
              sx={{
                color: "rgba(243, 243, 38, 0.199)",
                marginBottom: "10px"
              }}
              as={Checkbox}
              
              // variant="outlined"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px"
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
                // backgroundColor: "#3e3e3e",
                boxShadow: "0 0 4px rgba(252, 252, 15, 0.445)",
                borderRadius: "2px",

                // "& input:valid + fieldset": {
                //   borderColor: "white",
                //   borderWidth: 2,
                // },
              }}
              as={TextField}
              InputProps={{
                style: {
                  color: "white",
                  borderColor: "white",
                  padding: "0 10px",
                },
                inputProps: {
                  min: 1,
                },
                disableUnderline: true,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              padding: "10px 0",
            }}
          >
            {hasDetailsButton && (
              <Button
                variant="contained"
                // sx={{backgroundColor: '#FFCC33', color: 'black'}}
                onClick={() => router.push(`/pizzas/${pizzaId}`)}
              >
                Detalhes
              </Button>
            )}
            <Button color="primary" variant="contained" type="submit">
              Adicionar ao carrinho <AddShoppingCartIcon fontSize="small" />
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
