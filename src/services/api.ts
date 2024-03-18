import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const fetchGet = (url: string, params: any) => {
  return instance.get(url, { params }).then((res: any) => res);
};

export const post = (url: string, payload: any) => {
  return instance.post(url, payload).then((res: any) => res.data);
};

export const deleteReq = (id: any) => {
  return instance.delete("/todos/" + id);
};

export const fetchPatch = (url: string, payload: any) => {
  console.log("in patch !!");
  return instance.patch(url, payload).then((res: any) => res.data);
};