import {
  Modal,
  Box,
  Button,
  Avatar,
  Typography,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  styled,
} from "@mui/material";

import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  ErrorMessage,
  useFormikContext,
} from "formik";

import { validationEditPizza } from "../utils/schemas/formValidations";
import { Pizza } from "../Types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "white",
  bgcolor: "inherit",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type PizzaModalFormProps = {
  open: boolean;
  handleClose: () => void;
  handlePizzaUpdate: (pizzaInfo: Omit<Pizza, "id">) => Promise<void>;
  info: Pizza;
};

// type PizzaFields = Omit<Pizza, "id">;

export default function PizzaModalForm({
  open,
  handleClose,
  handlePizzaUpdate,
  info: { flavor, type, price, ingredients, img },
}: PizzaModalFormProps) {
  // const initialValues: PizzaFields = {
  //   flavor,
  //   type,
  //   price,
  //   ingredients,
  //   img,
  // };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Avatar
          sx={{
            width: "100px",
            height: "100px",
            backgroundColor: "#e5e5e5",
            transition: ".2s",
          }}
          alt="Pizza image"
          src={img}
        />
        <Typography>Nome: {flavor}</Typography>
        <Formik
          enableReinitialize
          initialValues={{
            flavor,
            type,
            price,
            ingredients,
            img,
          }}
          onSubmit={async (values) => {
            console.log(values);
            await handlePizzaUpdate(values);
          }}
          validationSchema={validationEditPizza}
        >
          {(props) => (
            <Form>
              <Field
                name="flavor"
                label="Nome"
                type="text"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite o nome da pizza"
                helperText={<ErrorMessage name="flavor" />}
                error={props.errors.flavor}
              />
              <Field
                name="type"
                label="Categoria"
                type="text"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite a categoria"
                helperText={<ErrorMessage name="type" />}
                error={props.errors.type}
              />
              <Field
                name="price"
                label="Preço"
                type="number"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite o preço"
                helperText={<ErrorMessage name="price" />}
                error={props.errors.price}
              />
              <Field
                name="ingredients"
                label="Ingredientes"
                type="text"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite os ingredientes"
                helperText={<ErrorMessage name="ingredients" />}
                error={props.errors.ingredients}
              />
              <Field
                name="img"
                label="URL da imagem"
                type="text"
                as={TextField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite a URL da imagem"
                helperText={<ErrorMessage name="img" />}
                error={props.errors.img}
              />

              <Button color="primary" variant="contained" type="submit">
                Editar
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
