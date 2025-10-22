import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentQuizService {

  constructor(private _httpClient: HttpClient) { }
  // timing
  remainingTimeSubject = new BehaviorSubject<number>(0);
  remainingTime = this.remainingTimeSubject.asObservable();
  // exam submission
  examSubmitSource = new BehaviorSubject<boolean>(false);
  examSubmit = this.examSubmitSource.asObservable();
  triggerExamSubmit() {
    this.examSubmitSource.next(true);
  }
  // show timer
  showTimerSubject = new BehaviorSubject<boolean>(false);
  showTimer = this.showTimerSubject.asObservable();

  setShowTimer(value: boolean) {
    this.showTimerSubject.next(value);
  }





  joinQuiz(data: any): Observable<any> {
    let payload = {
      code: data
    }
    return this._httpClient.post('quiz/join', payload)
  }

  submitQuiz(id: any, data: any): Observable<any> {
    return this._httpClient.post(`quiz/submit/${id}`, data)
  }

  questionWithoutAnswers(id: any): Observable<any> {
    return this._httpClient.get(`quiz/without-answers/${id}`)
  }

  AllResults(): Observable<any> {
    return this._httpClient.get('quiz/result')
  }

  firstFiveIncoming(): Observable<any> {
    return this._httpClient.get('quiz/incomming')
  }

  submitQuestions(id: any, data: any): Observable<any> {
    let payload = [
      {
        "question": data.id,
        "answer": data.answer
      }
    ]
    return this._httpClient.post(`quiz/submit/${id}`, payload)
  }

}
