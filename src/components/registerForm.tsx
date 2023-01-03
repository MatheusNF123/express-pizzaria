import { Button, TextField, Typography } from "@mui/material";
import {Formik, Form, Field, FormikHelpers, ErrorMessage} from "formik"
import { postRequest } from "../services/api";
import { validationLogin, validationRegister } from "../utils/schemas/formValidations";
import { useRouter } from 'next/router'

interface MyFormValues {
  name: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function RegisterForm() {
  const router = useRouter()
  const initialValues: MyFormValues = {name: '',address: '', email: '', password: '', confirmPassword: "", phone: ''};

  async function handleOnSubmitRegister({name, address, email, password, phone}: MyFormValues, actions:FormikHelpers<MyFormValues>) {
    try {      
      const { data, status } = await postRequest('register', {name, address, email, password, phone})          
      if(status !== 201) return alert(`${data.message}`)
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
     onSubmit={handleOnSubmitRegister}
     validationSchema={validationRegister}>
      {(props) => {
        return (

          <Form>
      <Typography variant="h4">Register</Typography>
      <Field
          name="name"
          label="Nome"
          type="text"
          as={TextField}            
          placeholder="Nome"
          variant="outlined"
          margin="dense"
          helperText={<ErrorMessage name="name" />}
          error={props.errors.name && props.touched.name}
          />
        
      <Field
          name="email"
          label="Email"
          type="email" 
          as={TextField}  
          variant="outlined"
          margin="dense"         
          placeholder="Digite um email"
          helperText={<ErrorMessage name="email" />}
          error={props.errors.email && props.touched.email}
          />       

      <Field 
          id="password"
          label="Password"
          name="password"
          as={TextField} 
          type="text"     
          variant="outlined"
          margin="dense"      
          placeholder="Digite uma senha"
          helperText={<ErrorMessage name="password" />}
          error={props.errors.password && props.touched.password}
          />
          
        
         <Field 
          name="confirmPassword"
          label="Confirmar"
          type="password"
          placeholder="Confirme sua senha"
          as={TextField}
          variant="outlined"
          margin="dense"
          helperText={<ErrorMessage name="confirmPassword" />}
          error={props.errors.confirmPassword && props.touched.confirmPassword} 
           />

         <Field 
            name="phone"
            label="Phone"
            as={TextField}
            id="phone"
            type="text"
            variant="outlined"
            margin="dense"
            placeholder="telefone"
            helperText={<ErrorMessage name="phone" />}
            error={props.errors.phone && props.touched.phone}
            />

         <Field name="address"
            label="Endereço"
            id="address"
            type="text"
            placeholder="Digite seu endereço"
            as={TextField} 
            variant="outlined"
            margin="dense"
            helperText={<ErrorMessage name="address" />}
            error={props.errors.address && props.touched.address}
            />
       <Button color="primary" variant="contained" fullWidth={false} type="submit">
          Cadastrar
        </Button>
      </Form>
        )
        }}
    </Formik>
  </div>
)
}
