export interface IQuiz {
  title?: string;
  description?: string;
  group: string;            
  questions_number: number;
  difficulty: string,
  type: string,
  schadule: string;          
  duration: number;        
  score_per_question: number;
}

export interface IExamRes {
  _id?: string;               // لو عندك id من المونجو أو السيرفر
  code: string;
  title: string;
  description: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';  // ممكن نعملها union types
  duration: number;
  group: string;
  instructor: string;
  participants: number;
  questions: string[];
  questions_number: number;
  score_per_question: number;
  schadule: string;          // ممكن نخليها Date لو بترجع كـ ISO
  status: 'open' | 'closed';
  createdAt: string;         // ISO date
  updatedAt: string;         // ISO date
  closed_at?: string;        // optional (مش دايماً موجودة)
}