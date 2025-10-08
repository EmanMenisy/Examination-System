import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentQuizService {

  constructor(private _httpClient: HttpClient) { }


  joinQuiz(data:any):Observable<any>{
    let payload = {
     code: data
    }
   return this._httpClient.post('quiz/join' , payload)
   }

  submitQuiz(id:any , data:any):Observable<any>{
    return this._httpClient.post(`quiz/submit/${id}` , data)
  }

  questionWithoutAnswers(id:any):Observable<any>{
    return this._httpClient.get(`quiz/without-answers/${id}`)
  }

  AllResults():Observable<any>{
   return this._httpClient.get('quiz/result')
  }

  firstFiveIncoming():Observable<any>{
    return this._httpClient.get('quiz/incomming')
  }

  submitQuestions(id:any,data:any):Observable<any>{
    let payload = [
      {
        "question":data.id,
        "answer":data.answer
      }
    ]
   return this._httpClient.post(`quiz/submit/${id}`, payload)
  }
  
}
