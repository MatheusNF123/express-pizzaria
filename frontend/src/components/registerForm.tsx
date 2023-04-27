import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  styled,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { setCookie } from "nookies";

import { postRequest } from "../services/api";
import { validationRegister } from "../utils/schemas/formValidations";
import { userContext } from "../context/userProvider";
import { Login } from "../Types";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#0000005c",
  borderRadius: "10px",
  color: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  padding: "40px",
  overflowY: "auto",
  maxHeight: "650px",

  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "10px",
  },
}));

interface MyFormValues {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function RegisterForm() {
  const { handleLogin } = useContext(userContext);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleOnSubmitRegister(
    { firstName, lastName, address, email, password, phone }: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) {
    try {
      const {
        data: { message, token, ...user },
        status,
      } = await postRequest<Login>("register", {
        name: `${firstName} ${lastName}`,
        address,
        email,
        password,
        phone,
      });
      if (status !== 201) return alert(`${message}`);

      setCookie(undefined, "pizzeria.token", token, {
        maxAge: 60 * 60 * 20, // 20 hours
      });

      await handleLogin(user);

      actions.resetForm();
      router.push("/");
    } catch (err) {
      return alert(`Erro interno, volte mais tarde :)`);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "",
      }}
    >
      <StyledBox>
        <Formik
          initialValues={initialValues}
          onSubmit={handleOnSubmitRegister}
          validationSchema={validationRegister}
        >
          {(props) => {
            return (
              <Form>
                <Typography variant="h4">Cadastro</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="firstName"
                      label="Nome"
                      type="text"
                      as={StyledField}
                      placeholder="Nome"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      helperText={<ErrorMessage name="firstName" />}
                      error={props.errors.firstName && props.touched.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="lastName"
                      label="SobreNome"
                      type="text"
                      as={StyledField}
                      placeholder="SobreNome"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      helperText={<ErrorMessage name="lastName" />}
                      error={props.errors.lastName && props.touched.lastName}
                    />
                  </Grid>
                </Grid>

                <Field
                  name="email"
                  label="Email"
                  type="email"
                  as={StyledField}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  placeholder="Digite um email"
                  helperText={<ErrorMessage name="email" />}
                  error={props.errors.email && props.touched.email}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      id="password"
                      label="Senha"
                      name="password"
                      as={StyledField}
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      placeholder="Digite uma senha"
                      helperText={<ErrorMessage name="password" />}
                      error={props.errors.password && props.touched.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              sx={{ color: "white" }}
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="confirmPassword"
                      label="Confirmar"
                      type="password"
                      placeholder="Confirme sua senha"
                      as={StyledField}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      helperText={<ErrorMessage name="confirmPassword" />}
                      error={
                        props.errors.confirmPassword &&
                        props.touched.confirmPassword
                      }
                    />
                  </Grid>
                </Grid>
                <Field
                  name="phone"
                  label="Telefone"
                  as={StyledField}
                  id="phone"
                  type="text"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  placeholder="(00) 00000-0000"
                  helperText={<ErrorMessage name="phone" />}
                  error={props.errors.phone && props.touched.phone}
                />
                <Field
                  name="address"
                  label="Endereço"
                  id="address"
                  type="text"
                  placeholder="Digite seu endereço"
                  as={StyledField}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  helperText={<ErrorMessage name="address" />}
                  error={props.errors.address && props.touched.address}
                />
                <Typography mt={1} mb={2}>
                  <Link
                    style={{ textDecoration: "none", color: "#FFCC33" }}
                    href="/login"
                  >
                    Já tem uma conta?
                  </Link>
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{ fontWeight: "bold", fontSize: "20px" }}
                >
                  Cadastrar
                </Button>
              </Form>
            );
          }}
        </Formik>
      </StyledBox>
    </Box>
  );
}
