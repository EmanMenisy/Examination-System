import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Istudents } from '../Interfaces/istudents';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http :HttpClient) { }

  Getter():Observable<Istudents[]>{  //whole
    return this.http.get<Istudents[]>('student')
  }


  GetterWithout():Observable<Istudents[]>{ // not linked to specific group
    return this.http.get<Istudents[]>('student/without-group')
  }

  Top_5():Observable<any>{ //Elite
    return this.http.get('student/top-five')
  }


}
