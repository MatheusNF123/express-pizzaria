import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3001/'
})


export const getRequest = async (endPoint: string) => {
  const { data, status } = await api.get(endPoint)
  return {data, status}
}

export const postRequest = async (endPoint: string, body: any) => {
  const { data, status } = await api.post(endPoint, { body })
  return {data, status}
}

export const deleteRequest = async(endPoint: string, id: string) => {
  const {status} = await api.delete(`${endPoint}/${id}`)  
  return { status }
}

export const putRequest = async (endPoint: string, body: any) => {
  const { data, status } = await api.put(endPoint, { body })
  return {data, status}
}