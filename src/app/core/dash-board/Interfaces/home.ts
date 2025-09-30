export interface IStudent {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  avg_score: number;
  group: IGroup;
}

export interface IGroup {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

