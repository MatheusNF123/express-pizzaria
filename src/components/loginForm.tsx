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
  styled,
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
      console.log('HHH');
      
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
                  }}
                >
                  <Typography variant="h4" color="#FFCC33">
                    Login
                  </Typography>
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    as={StyledField}
                    placeholder="Digite seu email"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    helperText={<ErrorMessage name="email" />}
                    error={props.errors.email && props.touched.email}
                  />
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    as={StyledField}
                    placeholder="Digite sua senha"
                    margin="dense"
                    fullWidth
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
                    sx={{
                      fontSize: "25px",
                      fontWeight: "bold",
                    }}
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
