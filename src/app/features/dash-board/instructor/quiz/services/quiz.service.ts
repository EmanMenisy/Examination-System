import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuiz } from '../interfaces/iquiz';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _HttpClient:HttpClient) { }

  createQuiz(data: any):Observable<any>{
   return this._HttpClient.post<IQuiz>('quiz' , data)
  }

  getAllQuizes():Observable<any>{
    return this._HttpClient.get('quiz')
  }

  UpdateQuiz(Id:any , data:any):Observable<any>{
    const payload = {
      title :data
    }
    return this._HttpClient.put(`quiz/${Id}`, payload)
  }

  lastComplatedQuiz():Observable<any>{
    return this._HttpClient.get('quiz/completed')
  }
  firstFiveIncome():Observable<any>{
    return this._HttpClient.get('quiz/incomming')
  }

}
