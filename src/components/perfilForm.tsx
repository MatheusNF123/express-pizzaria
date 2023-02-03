
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

interface MyFormValues {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function PerfilForm() {
  const router = useRouter();
  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };

  async function handleOnSubmitRegister(
    { firstName, lastName, address, email, password, phone }: MyFormValues,
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
                      <IconButton>
                        <Avatar sx={{
                          width: '200px',
                          height: '200px',
                          backgroundColor: '#e5e5e5',
                          transition: ".2s",
                          '&:hover':
                          {
                            backgroundColor: '#f7f7f7',
                          }
                        }}
                          alt="imagemPerfil" src="" />
                        <CameraEnhanceIcon sx={{
                          position: "absolute", fontSize: '40px', color: '#595959', bottom: '20px', right: '30px',
                        }} />
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
