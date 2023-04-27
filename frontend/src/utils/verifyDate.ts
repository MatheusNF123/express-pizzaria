import { generateDate } from "./formatDate";

const verifyDate = (date: string, status: string) => {
  const maxMinutesToCancel = 1000 * 300;
  const orderDate = new Date(date.split(".")[0]).getTime() + maxMinutesToCancel;

  const nowDate = generateDate();

  if (status === "Cancelado") return true;

  return new Date(nowDate).getTime() > orderDate;
};

export default verifyDate;
