import { DeleteGroupComponent } from '../components/groups/delete-group/delete-group.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGroupReq, IGroupRes, IGroup, IUpdateGroupRes } from '../interfaces/IGroup';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<IGroup> {
    return this._httpClient.get<IGroup>(`group`)
  }
  createGroup(data: IGroupReq): Observable<IGroupRes> {
    return this._httpClient.post<IGroupRes>(`group`, data)
  }
  getGroupById(id: string): Observable<IGroup> {
    return this._httpClient.get<IGroup>(`group/${id}`)
  }
  updateGroup(id: string, data: IGroupReq): Observable<IUpdateGroupRes> {
    return this._httpClient.put<IUpdateGroupRes>(`group/${id}`, data)
  }
  DeleteGroup(id: string): Observable<IGroupRes> {
    return this._httpClient.delete<IGroupRes>(`group/${id}`)
  }
}
