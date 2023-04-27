import verifyCookie from "./verifyCookie";
import { getRequest } from "./api";
import { User } from "../Types";
import setApiHeaders from "./setApiHeaders";

type GetUserReturn = {
  data: User | null;
};

export default async function getUser(ctx?: any): Promise<GetUserReturn> {
  if (!verifyCookie(ctx)) return { data: null };

  try {
    setApiHeaders(ctx);
    const { data, status } = await getRequest<User>("user");

    if (status !== 200) return { data: null };

    return {
      data,
    };
  } catch (error) {
    return { data: null };
  }
}
