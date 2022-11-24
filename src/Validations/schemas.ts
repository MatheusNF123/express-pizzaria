import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().regex(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/, "Invalid Phone")
});
