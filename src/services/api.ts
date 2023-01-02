import axios from "axios";

import { Pizza } from "../Types";

export const api = axios.create({
  baseURL: "http://localhost:3001/",
});

type ApiResponse = {
  data: Pizza[];
  status: number;
};


// Add a response interceptor
api.interceptors.response.use(function (response) {  
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  if(error.message !== 'Network Error') {
    return error.response
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export const getRequest = async (endPoint: string): Promise<ApiResponse> => {
  const { data, status } = await api.get(endPoint);
  return { data, status };
};

export const postRequest = async (endPoint: string, body: any) => {
  const { data, status } = await api.post(endPoint, { body });
  return { data, status };
};

export const deleteRequest = async (endPoint: string, id: string) => {
  const { status } = await api.delete(`${endPoint}/${id}`);
  return { status };
};

export const putRequest = async (endPoint: string, body: any) => {
  const { data, status } = await api.put(endPoint, { body });
  return { data, status };
};
