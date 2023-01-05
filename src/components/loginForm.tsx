import { Button, TextField, Typography, Box, Grid, Paper } from "@mui/material";
import {Formik, Form, Field, FormikHelpers, ErrorMessage} from "formik"
import { useState } from "react";
import { postRequest } from "../services/api";
import { validationLogin } from "../utils/schemas/formValidations";
import { useRouter } from 'next/router'
import { AxiosError } from "axios";
import Link from "next/link";

interface MyFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter()
  const initialValues: MyFormValues = {email: '', password: ''};

  async function handleOnSubmitLogin({email, password}: MyFormValues, actions:FormikHelpers<MyFormValues>) {
    try {      
      const { data, status } = await postRequest('login', {email, password})          
      if(status !== 200) return alert(`${data.message}`)
      router.push('/')
      actions.resetForm();      
    } catch (err) {                 
      return alert(`Erro interno, volte mais tarde :)`)
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
  }}
  >
  <Paper elevation={3}>  
  <Box m={5} p={3}
  sx={{
    display: "flex",
    flexDirection: "column",
  }}> 
    <Formik
     initialValues={initialValues}
     onSubmit={handleOnSubmitLogin}
     validationSchema={validationLogin}
     >
      {(props) => {
        return (
          <Form>
      <Typography variant="h4">Login</Typography>
      <Field 
          name="email"
          type="email"
          label="Email"
          as={TextField}         
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
          type="password"
          label="Password"
          as={TextField}       
          placeholder="Digite sua senha"
          margin="dense"
          fullWidth
          helperText={<ErrorMessage name="password" />}
          error={props.errors.password && props.touched.password}
          />
         <Typography style={{ color: '#757575' }} mt={1} mb={2}>
         Não tem uma conta?
         <Link style={{ textDecoration: "none", color: '#1769aa' }} href="/register">  crie uma!</Link>
         </Typography>
       <Button color="primary" variant="contained" fullWidth type="submit">
          Login
        </Button>
      </Form>
        )
        }}
    </Formik>
  </Box>
  </Paper>
   </Box>
)
}
