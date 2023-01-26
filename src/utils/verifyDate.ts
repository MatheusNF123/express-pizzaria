import { generateDate } from "./formatDate"

const verifyDate = (date: Date) => {
  const maxMinutesToCancel = 1000 * 300;
  const orderDate = new Date(date).getTime() + maxMinutesToCancel;

  const nowDate = generateDate();

  return new Date(nowDate).getTime() > orderDate

}

export default verifyDate