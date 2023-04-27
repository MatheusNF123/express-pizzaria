import {
  Modal,
  Box,
  Button,
  Avatar,
  TextField,
  styled,
  Typography,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  validationPizza,
  validationFieldIngredient,
} from "../utils/schemas/formValidations";
import { Pizza } from "../Types";

const StyledField = styled(TextField)(({ theme }) => ({
  ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
    color: "white",
  },
  "label, input ": {
    color: "white",
  },

  ".MuiOutlinedInput-root:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "white",
    },
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: "white",
  "&.Mui-checked": {
    color: theme.palette.primary.main,
  },
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "80%",
  overflow: "auto",
  width: { xs: 350, sm: 400 },
  color: "white",
  bgcolor: "#000000d6",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#FFCC33",
    borderRadius: "10px",
  },
};

type PizzaUpdateModalFormProps = {
  open: boolean;
  handleClose: () => void;
  handlePizzaUpdate: (pizzaInfo: Omit<Pizza, "id">) => Promise<void>;
  info: Pizza;
};

export default function PizzaUpdateModalForm({
  open,
  handleClose,
  handlePizzaUpdate,
  info: { flavor, type, price, ingredients, img },
}: PizzaUpdateModalFormProps) {
  const handleIngredientsAddition = async (
    oddIngredients: string[],
    newValue: string,
    setField: (field: string, value: string[] | string) => void,
    setFieldError: (field: string, value: string | undefined) => void
  ) => {
    try {
      await validationFieldIngredient.validate(newValue);

      const newIngredients = [...oddIngredients, newValue];
      setField("ingredients", newIngredients);
      setField("ingredient", "");
    } catch (error: any) {
      setFieldError("ingredient", error.message);
    }
  };

  const handleIngredientDeletion = (
    oddIngredients: string[],
    index: number,
    setField: (field: string, value: string[]) => void
  ) => {
    const newIngredients = oddIngredients.filter((_, i) => i != index);
    setField("ingredients", newIngredients);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button
          onClick={handleClose}
          sx={{ position: "absolute", top: 10, right: 5, color: "white" }}
        >
          <CloseIcon />
        </Button>
        <Avatar
          sx={{
            width: 140,
            height: 140,
            backgroundColor: "#e5e5e5",
            transition: ".2s",
            margin: "auto",
            mb: 2,
            border: "2px solid #FFCC33",
          }}
          title={`Pizza de ${flavor}`}
          src={img}
        />
        <Formik
          enableReinitialize
          initialValues={{
            flavor,
            type,
            price,
            ingredient: "",
            ingredients,
            img,
          }}
          onSubmit={async ({ ingredient, ...fields }) => {
            console.log(fields);
            await handlePizzaUpdate({ ...fields, price: +fields.price });
          }}
          validationSchema={validationPizza}
        >
          {(props) => (
            <Form>
              <Field
                name="flavor"
                label="Nome"
                type="text"
                as={StyledField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite o nome da pizza"
                helperText={<ErrorMessage name="flavor" />}
                error={props.errors.flavor}
              />

              <Box sx={{ border: "1px solid white", borderRadius: "4px" }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    textAlign: "center",
                    mb: "0.9px",
                  }}
                >
                  Categoria
                </Typography>

                <RadioGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                  aria-label="Categoria"
                  value={props.values.type}
                  onChange={({ target }) => {
                    props.setFieldValue("type", target.value);
                  }}
                >
                  <FormControlLabel
                    value="Salgado"
                    control={<StyledRadio />}
                    label="Salgado"
                  />
                  <FormControlLabel
                    value="Doce"
                    control={<StyledRadio />}
                    label="Doce"
                  />
                </RadioGroup>
              </Box>

              <Field
                name="price"
                label="Preço"
                type="number"
                as={StyledField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite o preço"
                error={props.errors.price}
              />
              <ErrorMessage name="price" />

              <Box sx={{ border: "1px solid white", p: 2 }}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    textAlign: "center",
                    mb: "0.9px",
                  }}
                >
                  Ingredientes
                </Typography>

                <ul style={{ padding: "5px 10px 10px 10px", margin: "0px" }}>
                  {props.values.ingredients.map((ingredient, i) => (
                    <li
                      key={i}
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {ingredient}
                      <Button
                        type="button"
                        onClick={() =>
                          handleIngredientDeletion(
                            props.values.ingredients,
                            i,
                            props.setFieldValue
                          )
                        }
                      >
                        <CloseIcon />
                      </Button>
                    </li>
                  ))}
                </ul>
              </Box>
              <Field
                name="ingredient"
                label="Ingrediente"
                type="text"
                as={StyledField}
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder="Digite o ingrediente"
                helperText={<ErrorMessage name="ingredient" />}
                error={props.errors.ingredient}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="button"
                        onClick={() =>
                          handleIngredientsAddition(
                            props.values.ingredients,
                            props.values.ingredient,
                            props.setFieldValue,
                            props.setFieldError
                          )
                        }
                      >
                        Adicionar
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                name="img"
                label="URL da imagem"
                type="text"
                as={StyledField}
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
