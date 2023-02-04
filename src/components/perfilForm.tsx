
import { Button, TextField, Typography, Box, Grid, Paper, Avatar, IconButton } from "@mui/material";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { postRequest } from "../services/api";
import {
  validationLogin,
  validationRegister,
} from "../utils/schemas/formValidations";
import { useRouter } from "next/router";
import Link from "next/link";
import Icon from '@mui/material/Icon';
import Image from 'next/image'
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { useRef, useState } from "react";



interface MyFormValues {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  phone: string;
  imagem: null
}

export default function PerfilForm() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null | undefined>(null);
  const router = useRouter();
  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    imagem: null,
  };

  const handleOnChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(target.files[0]?.name);
  //   const formData = new FormData();
  //   formData.append("file", target.files[0]?.name);
  //  console.log(formData)
  };
  // const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = target.files![0];    
  //   setFile(selectedFile);


  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     console.log(e.target)
  //     setPreviewUrl(e.target?.result);
  //   };
  //   reader.readAsDataURL(selectedFile);
   
  // };
   


  async function handleOnSubmitRegister(
    { firstName, lastName, address, email, password, phone,  }: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) {
    try {
      const { data, status } = await postRequest("register", {
        name: `${firstName} ${lastName}`,
        address,
        email,
        password,
        phone,
      });
      if (status !== 201) return alert(`${data.message}`);
      router.push("/");
      actions.resetForm();
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
      }}
    >
      <Paper elevation={3}>
        <Box
          m={5}
          p={3}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmitRegister}
            validationSchema={validationRegister}
          >
            {(props) => {
              return (
                <Form>
                  <Typography variant="h4">Perfil</Typography>

                  <Box
                    // component="img"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      padding: '10px',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                      <label htmlFor="upload-photo">
                      <IconButton color="secondary" component="span">
                      <input
                        id="upload-photo"
                        name="imagem"
                        accept="image/*"
                        type="file"
                        hidden
                        ref={inputRef}
                        onChange={handleOnChange}
                      />
                        <Avatar sx={{
                          width: '180px',
                          height: '180px',
                          backgroundColor: '#e5e5e5',
                          transition: ".2s",
                          '&:hover':
                          {
                            backgroundColor: '#f7f7f7',
                          }
                        }}
                          alt="imagemPerfil" src={''} />
                        <CameraEnhanceIcon sx={{
                          position: "absolute", fontSize: '40px', color: '#595959', bottom: '20px', right: '30px',
                        }} />
                        
                      </IconButton>                      
                      </label>

                    </Box>

                  </Box>

                  <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="fullName"
                        label="Nome"
                        type="text"
                        as={TextField}
                        placeholder="Nome"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        helperText={<ErrorMessage name="fullName" />}
                        error={
                          props.errors.firstName && props.touched.firstName
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* <Field
                        name="lastName"
                        label="SobreNome"
                        type="text"
                        as={TextField}
                        placeholder="SobreNome"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        helperText={<ErrorMessage name="lastName" />}
                        error={props.errors.lastName && props.touched.lastName}
                      /> */}
                      <Button size="large" fullWidth
                        variant="contained">Alterar Senha</Button>
                    </Grid>
                  </Grid>

                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    as={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    placeholder="Digite um email"
                    helperText={<ErrorMessage name="email" />}
                    error={props.errors.email && props.touched.email}
                  />

                  {/* <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        id="password"
                        label="Senha"
                        name="password"
                        as={TextField}
                        type="password"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        placeholder="Digite uma senha"
                        helperText={<ErrorMessage name="password" />}
                        error={props.errors.password && props.touched.password}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="confirmPassword"
                        label="Confirmar"
                        type="password"
                        placeholder="Confirme sua senha"
                        as={TextField}
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
                  </Grid> */}
                  <Field
                    name="phone"
                    label="Telefone"
                    as={TextField}
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
                    as={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    helperText={<ErrorMessage name="address" />}
                    error={props.errors.address && props.touched.address}
                  />

                  <Button
                    color="primary"
                    variant="contained"

                    type="submit"
                  >
                    salvar
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
