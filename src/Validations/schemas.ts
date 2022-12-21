import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(2),
    address: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z
      .string()
      .regex(
        /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
        "Invalid Phone"
      ),
  })
  .strict();

export const userUpdateSchema = z
  .object({
    id: z.string(),
    name: z.string().min(2),
    address: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z
      .string()
      .regex(
        /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
        "Invalid Phone"
      ),
    role: z.enum(["customer", "admin"]),
  })
  .strict();

const pizzasOrderSchema = z
  .object({
    pizzaId: z.string(),
    size: z.enum(["small", "medium", "big"]),
    border: z.boolean(),
    quantity: z.number(),
  })
  .strict();

export const orderSchema = z
  .object({
    // userId: z.string(),
    pizzas: z.array(pizzasOrderSchema),
  })
  .strict();

export const pizzaSchema = z
  .object({
    flavor: z.string(),
    type: z.enum(["sweet", "savory"]),
    price: z.number(),
    ingredients: z.array(z.string()),
    img: z.string(),
  })
  .strict();

export const pizzaUpdateSchema = z
  .object({
    id: z.string(),
    flavor: z.string(),
    type: z.enum(["sweet", "savory"]),
    price: z.number(),
    ingredients: z.array(z.string()),
    img: z.string(),
  })
  .strict();
