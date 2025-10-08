export interface Istudents {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  group?: IGroup;          // group بييجي nested object
}

export interface IGroup {
  _id: string;
  name: string;
  instructor: string;      // obj?
  max_students: number;
  students: string[];      //student id
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
