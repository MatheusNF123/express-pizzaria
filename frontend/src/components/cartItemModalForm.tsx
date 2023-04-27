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
} from "@mui/material";

import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  ErrorMessage,
  useFormikContext,
} from "formik";
import CloseIcon from "@mui/icons-material/Close";

import { validationEditCartItem } from "../utils/schemas/formValidations";
import { CartPizzas, PurchaseInfo } from "../Types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, sm: 400 },
  color: "white",
  bgcolor: "#000000d6",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px #a8a8a86e",
  p: 4,
};

type CartItemModalFormProps = {
  open: boolean;
  handleClose: () => void;
  handleCartItemUpdate: (cartItemInfo: PurchaseInfo) => Promise<void>;
  info: CartPizzas;
};

export default function CartItemModalForm({
  open,
  handleClose,
  handleCartItemUpdate,
  info,
}: CartItemModalFormProps) {
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
            width: "150px",
            height: "150px",
            backgroundColor: "#e5e5e5",
            transition: ".2s",
            margin: "auto",
            mb: 2,
            borderRadius: "10px",
            border: "2px solid #FFCC33",
          }}
          alt={`Pizza de ${info.pizza.flavor}`}
          src={info.pizza.img}
        />
        <Typography
          sx={{
            m: 3,
            fontSize: "26px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {info.pizza.flavor}
        </Typography>
        <Formik
          enableReinitialize
          initialValues={{
            size: info.size,
            border: info.border,
            quantity: info.quantity,
          }}
          onSubmit={async (values) => {
            console.log(values);
            await handleCartItemUpdate(values);
          }}
          validationSchema={validationEditCartItem}
        >
          {(props) => (
            <Form style={{ width: "100%" }}>
              <Box sx={{ width: "200px", margin: "auto" }}>
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
                    variant="outlined"
                    sx={{
                      color: "white",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                        borderColor: "#FFCC33",
                      },

                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                        borderColor: "#FFCC33",
                      },
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
                    size="medium"
                    type="checkbox"
                    sx={{
                      color: "#FFCC33",
                      marginBottom: "10px",
                    }}
                    as={Checkbox}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Typography>Quantidade:</Typography>
                  <Field
                    name="quantity"
                    variant="outlined"
                    type="number"
                    helperText={<ErrorMessage name="quantity" />}
                    error={props.errors.quantity}
                    sx={{
                      mb: 2,
                      ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#FFCC33",
                          color: "white",
                        },
                      "label, input ": {
                        color: "white",
                      },
                      ".MuiOutlinedInput-root:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#FFCC33",
                        },
                      width: "80px",
                    }}
                    as={TextField}
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                      disableUnderline: true,
                    }}
                  />
                </Box>

                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{ fontWeight: "bold" }}
                >
                  Editar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
