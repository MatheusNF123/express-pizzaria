import * as yup from "yup"

export const validationLogin = yup.object().shape({
  email: yup.string().email("Não e um email valido").required("Este campo é obrigatório"),
  password: yup.string().min(6, "A senha deve ter 8 caracteres").required("Este campo é obrigatório"),
})