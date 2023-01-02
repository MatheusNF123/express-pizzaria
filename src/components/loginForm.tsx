import { Button } from "@mui/material";
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
     validationSchema={validationLogin}>
      <Form>
        <label htmlFor="email"></label>
      <Field 
          id="email"
          name="email"
          type="email"           
          placeholder="Digite seu email"
          />
          <ErrorMessage
            component="span"
            name="email"
          />
          <label htmlFor="password"></label>
      <Field 
          id="password"
          name="password"
          type="text"           
          placeholder="Digite sua senha"
          />
          <ErrorMessage
            component="span"
            name="password"
            className="form-error"
          />
       <Button color="primary" variant="contained" fullWidth={false} type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  </div>
)
}
