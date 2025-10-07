import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Istudents } from '../Interfaces/istudents';
import { IGroup } from '../../instructor/interfaces/IGroup';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) {}

  Getter(): Observable<Istudents[]> {
    return this.http.get<Istudents[]>('student');
  }

  GetterWithout(): Observable<Istudents[]> {
    return this.http.get<Istudents[]>('student/without-group');
  }

  Top_5(): Observable<any> {
    return this.http.get('student/top-five');
  }

  Groups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>('group');
  }

  addStudent(studentData: any): Observable<any> {
    return this.http.post<any>('student', studentData);
  }

  updateStudent(studentId: string, studentData: any): Observable<any> {
    return this.http.put<any>(`student/${studentId}`, studentData);
  }

  DeleteStudent(_id: string): Observable<any> {
    return this.http.delete<any>(`student/${_id}`);
  }

  GroupsRemover(studentId: string, studentGroup: string): Observable<any> {
    return this.http.delete<any>(`student/${studentId}/${studentGroup}`);
  }
}
