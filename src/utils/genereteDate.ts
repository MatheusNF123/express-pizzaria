export default function generateDate() {
  const dateFormat = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).split(' ');
  const time = dateFormat[1];
  const date = dateFormat[0].split('/').reverse().join("-");
  const formattedDate = `${date}T${time}`;
  return formattedDate;
}
