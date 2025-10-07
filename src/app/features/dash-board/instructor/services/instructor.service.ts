import { DeleteGroupComponent } from '../components/groups/delete-group/delete-group.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroupReq, IGroupRes, IGroup, IUpdateGroupRes, Student } from '../interfaces/IGroup';
import { IQuestionsReq, IQuestionsRes } from '../interfaces/IQuestions';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private _httpClient: HttpClient) { }

  getAll():Observable<any> {
    return this._httpClient.get<IGroup[]>(`group`)
  }
  createGroup(data: any): Observable<IGroupRes> {
    return this._httpClient.post<IGroupRes>(`group`, data)
  }
  getGroupById(id: string): Observable<IGroup> {
    return this._httpClient.get<IGroup>(`group/${id}`)
  }
  updateGroup(id: string, data: any): Observable<any> {
    return this._httpClient.put<any>(`group/${id}`, data)
  }
  DeleteGroup(id: string): Observable<IGroupRes> {
    return this._httpClient.delete<IGroupRes>(`group/${id}`)
  }

  //students
  getAllStudents(): Observable<Student[]> {
    return this._httpClient.get<Student[]>('student')
  }


  // Questions
  getAllQuestions(): Observable<IQuestionsRes[]> {
    return this._httpClient.get<IQuestionsRes[]>(`question`)
  }
  createQuestions(data: IQuestionsReq): Observable<IGroupRes> {
    return this._httpClient.post<IGroupRes>(`question`, data)
  }
  DeleteQuestions(id: string): Observable<IGroupRes> {
    return this._httpClient.delete<IGroupRes>(`question/${id}`)
  }
  getQuestionsById(id: string): Observable<IGroup> {
    return this._httpClient.get<IGroup>(`question/${id}`)
  }
  updateQuestions(id: string, data: any): Observable<any> {
    return this._httpClient.put<any>(`question/${id}`, data)
  }
}
