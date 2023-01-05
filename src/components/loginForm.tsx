import { Button, TextField, Typography } from "@mui/material";
import {Formik, Form, Field, FormikHelpers, ErrorMessage} from "formik"
import { useState } from "react";
import { postRequest } from "../services/api";
import { validationLogin } from "../utils/schemas/formValidations";
import { useRouter } from 'next/router'
import { AxiosError } from "axios";


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
  <div>    
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
          helperText={<ErrorMessage name="password" />}
          error={props.errors.password && props.touched.password}
          />
         
       <Button color="primary" variant="contained" fullWidth={false} type="submit">
          Login
        </Button>
      </Form>
        )
        }}
    </Formik>
  </div>
)
}
