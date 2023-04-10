import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useContext } from "react";

import { validationPerfil } from "../utils/schemas/formValidations";

import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  Grid,
  styled,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { userContext } from "../context/userProvider";
import { putRequest } from "../services/api";
import { User } from "../Types";

const StyledField = styled(TextField)(({ theme }) => ({
  ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
    color: "white",
  },
  "label, input": {
    color: "white",
  },

  ".MuiOutlinedInput-root:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "white",
    },

  ".MuiInputLabel-root:has(~ .Mui-disabled)": {
    color: "#9e9e9e4e",
  },

  ".MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9e9e9e4e",
    backgroundColor: "#2020204e",
  },

  ".MuiOutlinedInput-root.Mui-disabled:hover .MuiOutlinedInput-notchedOutline":
    {
      borderColor: "#9e9e9e4e",
    },

  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#9e9e9e4e",
    color: "#9e9e9e4e",
  },
}));

interface MyFormValues {
  image?: string;
  fullName: string;
  address?: string;
  email?: string;
  password?: string;
  phone?: string;
}

interface PerfilFormProps {
  user: User;
}

export default function PerfilForm({ user }: PerfilFormProps) {
  const { handleUser } = useContext(userContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: MyFormValues = {
    image: user?.img || "",
    fullName: user?.name! || "",
    address: user?.address || "",
    email: user?.email || "",
    password: "",
    phone: user?.phone || "",
  };

  async function handleOnSubmitEditProfile({
    fullName,
    address,
    email,
    password,
    phone,
    image,
  }: MyFormValues) {
    const _fullName = fullName?.split(" ");
    const [firstName, ...lastName] = _fullName;

    try {
      const { data, status } = await putRequest("update", {
        name: `${firstName} ${lastName.join(" ")}`,
        address,
        email,
        password: password || undefined,
        phone,
        img: image,
      });
      if (status !== 200) return alert(`${data.message}`);
      setIsEditing(false);
      setEditPassword(false);
      setShowPassword(false);
      handleUser(data);
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
        bgcolor: "#0000005c",
        color: "primary.main",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
          enableReinitialize
        >
          {(props) => {
            return (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }} variant="h4">
                    Perfil
                  </Typography>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    sx={{
                      transition: ".2s",
                      backgroundColor: "transparent",
                      border: 0,
                      borderRadius: 3,
                      color: "white",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      "&:active": {
                        color: "#e4bb34",
                      },
                    }}
                  >
                    <EditIcon
                      fontSize="medium"
                      sx={{
                        transition: ".2s",
                        "&:active": {
                          color: "#e4bb34",
                        },
                      }}
                    />
                  </Button>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "180px",
                        height: "180px",
                        backgroundColor: "#e5e5e5",
                        transition: ".2s",
                        borderRadius: "50%",
                        objectFit: "cover",
                        mb: 5,
                        border: "1px solid white",
                      }}
                      alt="Imagem de perfil"
                      src={
                        props.values.image ||
                        "https://cdn-icons-png.flaticon.com/512/711/711769.png"
                      }
                    />
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="fullName"
                      label="Nome"
                      type="text"
                      as={StyledField}
                      placeholder="Nome"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      helperText={<ErrorMessage name="fullName" />}
                      error={
                        props.touched.fullName && Boolean(props.errors.fullName)
                      }
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {editPassword ? (
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
                        disabled={!isEditing}
                        error={
                          props.errors.password &&
                          Boolean(props.touched.password)
                        }
                        onBlur={props.handleBlur}
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
                    ) : (
                      <Button
                        size="large"
                        sx={{
                          marginTop: { xs: "-10px", sm: "8px" },
                          height: "56px",
                          fontWeight: "bold",
                          "&:disabled": {
                            color: "#9e9e9e4e",
                            bgcolor: "#2020204e",
                          },
                        }}
                        disabled={!isEditing}
                        fullWidth
                        onClick={(e) => setEditPassword(true)}
                        variant="contained"
                      >
                        Alterar Senha
                      </Button>
                    )}
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
                  error={props.errors.email && Boolean(props.touched.email)}
                  disabled={!isEditing}
                />

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
                  error={props.errors.phone && Boolean(props.touched.phone)}
                  disabled={!isEditing}
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
                  error={props.errors.address && Boolean(props.touched.address)}
                  disabled={!isEditing}
                />
                <Field
                  name="image"
                  label="URL do avatar"
                  id="image"
                  type="text"
                  placeholder="URL do avatar"
                  as={StyledField}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  helperText={<ErrorMessage name="image" />}
                  error={props.errors.image}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  disabled={!isEditing}
                />

                <Button
                  sx={{
                    fontWeight: "bold",
                    "&:disabled": {
                      color: "#9e9e9e4e",
                      bgcolor: "#2020204e",
                    },
                  }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!isEditing}
                >
                  salvar
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
}
