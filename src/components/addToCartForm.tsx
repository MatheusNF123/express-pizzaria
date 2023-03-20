import { useContext } from "react";
import { Button, TextField, Checkbox, Select, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { userContext } from "../context/userProvider";

type AddToCartFormProps = {
  pizzaId: string;
};

export default function AddToCartForm({ pizzaId }: AddToCartFormProps) {
  const { handlePurchase } = useContext(userContext);

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
        <Form>
          <Field
            labelId="select-size-label"
            name="size"
            label="Tamanho"
            sx={{
              color: "white",
            }}
            as={Select}
          >
            <MenuItem value="médio">Médio</MenuItem>
            <MenuItem value="grande">Grande</MenuItem>
            <MenuItem value="pequeno">Pequeno</MenuItem>
          </Field>

          <Field
            name="border"
            label="Borda"
            size="large"
            type="checkbox"
            sx={{
              color: "white",
            }}
            as={Checkbox}
            variant="outlined"
            margin="dense"
          />
          <Field
            name="quantity"
            label="Quantidade"
            type="number"
            margin="dense"
            fullWidth
            helperText={<ErrorMessage name="quantity" />}
            error={props.errors.quantity}
            sx={{
              color: "white",
              borderColor: "white",

              "& input:valid + fieldset": {
                borderColor: "white",
                borderWidth: 2,
              },
            }}
            as={TextField}
            InputProps={{
              style: { color: "white", borderColor: "white" },
              inputProps: {
                min: 1,
              },
            }}
          />
          <Button color="primary" variant="contained" type="submit">
            Adicionar ao carrinho
          </Button>
        </Form>
      )}
    </Formik>
  );
}
