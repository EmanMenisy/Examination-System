export interface IQuestionsRes{
  _id: string;
  title: string;
  description: string;
  options: IOptionsRes;
  answer: string;
  status: string;
  instructor: string;
  difficulty: string;
  points: number;
  type: string;
}

export interface IOptionsRes {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}
export interface IQuestionsReq {
  title: string;
  description: string;
  options: IOptionsReq;
  answer: string;
  difficulty: string;
  type: string;
}

interface IOptionsReq {
  A: string;
  B: string;
  C: string;
  D: string;
}
export interface IList {
  name: string;
  code: string;
}
