export interface IGroup{
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
}
export interface IGroupRes {
  data: IData;
  message: string;
}

export interface IData {
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  _id: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}
export interface IGroupReq {
  name: string;
  students: string[];
}
export interface IUpdateGroupRes {
  data: Data;
  message: string;
}

export interface Data {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: Student[];
  max_students: number;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  group:IGroup[]
}


