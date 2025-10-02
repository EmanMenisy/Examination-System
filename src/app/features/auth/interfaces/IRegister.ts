export interface IRegisterReq {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}
export interface IRegisterRes {
  message: string;
  data: Data;
}

interface Data {
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

export interface IRole {
  name: string;
  value: string;
}
