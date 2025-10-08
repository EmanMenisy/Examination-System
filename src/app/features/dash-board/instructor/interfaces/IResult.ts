export interface IResult {
  quiz: IQuiz;
  participants: IParticipant[];
}

interface IParticipant  {
  _id: string;
  quiz: IQuiz2;
  participant: IParticipant[];
  score: number;
  started_at: string;
}

interface IParticipant {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface IQuiz2 {
  _id: string;
  title: string;
}

interface IQuiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  closed_at: string;
}
