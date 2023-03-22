import { useRouter } from "next/router";
import Link from "next/link";
import { useContext, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  makeStyles
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { setCookie } from "nookies";

import { postRequest } from "../services/api";
import { validationLogin } from "../utils/schemas/formValidations";
import { Login } from "../Types";
import { userContext } from "../context/userProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
interface MyFormValues {
  email: string;
  password: string;
}


export default function LoginForm() {
  const { handleLogin } = useContext(userContext);
  const router = useRouter();
  const initialValues: MyFormValues = { email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);

  async function handleOnSubmitLogin(
    { email, password }: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) {
    try {
      const {
        data: { message, token, ...user },
        status,
      } = await postRequest<Login>("login", { email, password });
      if (status !== 200) return alert(`${message}`);

      setCookie(undefined, "pizzeria.token", token, {
        path: "/",
        maxAge: 60 * 60 * 20, // 20 hours
      });

      await handleLogin(user);

      actions.resetForm();
      router.push("/pizzas");
    } catch (err) {
      return alert(`Erro interno, volte mais tarde :)`);
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ backgroundColor: "#0000005c" }}>
        <Box
          m={5}
          p={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            // backgroundColor: "red"
          }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmitLogin}
            validationSchema={validationLogin}
          >
            {(props) => {
              return (
                <Form
                  style={{
                    color: "white",
                    borderColor: "white",
                    // backgroundColor: "#0000005c",
                  }}>
                  <Typography variant="h4" color="#FFCC33">Login</Typography>
                  <Field
                    // classes={{ root: classes.field }}
                    name="email"
                    type="email"
                    label="Email"
                    as={TextField}
                    placeholder="Digite seu email"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    // helperText={<ErrorMessage name="email" />}
                    // error={props.errors.email && props.touched.email}
                    sx={{
                      borderRadius: "5px",
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                        color: "white",

                      }, 

                      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "inherit",
                      },
                    }}
                    InputProps={{
                      style: {
                        // color: "white",
                        borderColor: "white",
                        // padding: "0 10px",
                        '&::placeholder': {
                          color: "white",
                        },
                      },

                    }}
                  />
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    as={TextField}
                    placeholder="Digite sua senha"
                    margin="dense"
                    fullWidth
                    helperText={<ErrorMessage name="password" />}
                    error={props.errors.password && props.touched.password}
                    sx={{
                      color: "white",
                      // backGroundColor: "white",
                      borderColor: "white",
                    }}
                    InputProps={{
                      // style: {
                      //   color: "white",
                      //   borderColor: "white",
                      //   backGroundColor: "white",
                      // },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography mt={1} mb={2}>
                    Não tem uma conta?
                    <Link
                      style={{ textDecoration: "none", color: "#FFCC33" }}
                      href="/register"
                    >
                      {" "}
                      crie uma!
                    </Link>
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
}
