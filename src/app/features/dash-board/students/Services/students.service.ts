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

  /** جلب كل الطلاب */
  Getter(): Observable<Istudents[]> {
    return this.http.get<Istudents[]>('student');
  }

  /** جلب الطلاب اللي مش تابعين لجروب */
  GetterWithout(): Observable<Istudents[]> {
    return this.http.get<Istudents[]>('student/without-group');
  }

  /** جلب أفضل 5 طلاب */
  Top_5(): Observable<any> {
    return this.http.get('student/top-five');
  }

  /** جلب كل الجروبات */
  Groups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>('group');
  }

  /** إضافة طالب جديد */
  addStudent(studentData: any): Observable<any> {
    return this.http.post<any>('student', studentData);
  }

  /** تعديل بيانات طالب */
  updateStudent(studentId: string, studentData: any): Observable<any> {
    return this.http.put<any>(`student/${studentId}`, studentData);
  }

  /** حذف طالب */
  DeleteStudent(_id: string): Observable<any> {
    return this.http.delete<any>(`student/${_id}`);
  }

  /** إزالة جروب من طالب معين */
  GroupsRemover(studentId: string, studentGroup: string): Observable<any> {
    return this.http.delete<any>(`student/${studentId}/${studentGroup}`);
  }
}
