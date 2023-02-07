
import { Button, TextField, Typography, Box, Grid, Paper, Avatar, IconButton } from "@mui/material";
import { Formik, Form, Field, FormikHelpers, ErrorMessage, useFormikContext } from "formik";
import { postRequest } from "../services/api";
import {
  validationPerfil
} from "../utils/schemas/formValidations";
import { useRouter } from "next/router";
import Link from "next/link";
import Icon from '@mui/material/Icon';
import Image from 'next/image'
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { useRef, useState } from "react";

interface MyFormValues {
  image?: string;
  fullName: string;
  address: string;
  email: string;
  password: string;
  phone: string;

}





export default function PerfilForm() {
  const [editPassword, setEditPassword] = useState(false)
  const router = useRouter();
  const initialValues: MyFormValues = {
    image: '',
    fullName: "",
    address: "",
    email: "",
    password: "",
    phone: "",
  };


  async function handleOnSubmitEditProfile(
    { fullName, address, email, password, phone, image }: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) {
    const _fullName = fullName.split(' ')
    const [firstName, ...lastName] = _fullName
    //   const { data, status } = await postRequest("register", {
    //     name: `${firstName} ${lastName.join(' ')}`,
    //     address,
    //     email,
    //     password,
    //     phone,
    //   });
    //   if (status !== 201) return alert(`${data.message}`);
    //   router.push("/");
    //   actions.resetForm();
    // } catch (err) {
    //   return alert(`Erro interno, volte mais tarde :)`);
    // }
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
            onSubmit={handleOnSubmitEditProfile}
            validationSchema={validationPerfil}
          >
            {(props) => {
              return (
                <Form>
                  <Typography variant="h4">Perfil</Typography>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      padding: '10px',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>

                      <IconButton color="secondary" component="span">
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

                      </IconButton>


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
                          props.errors.fullName
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {editPassword ? <Field
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
                      /> :
                        <Button size="large" fullWidth onClick={(e) => setEditPassword(true)}
                          variant="contained">Alterar Senha</Button>}
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
                  <Field
                    name="image"
                    label="URL do avatar"
                    id="image"
                    type="text"
                    placeholder="URL do avatar"
                    as={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    helperText={<ErrorMessage name="image" />}
                    error={props.errors.image}
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
