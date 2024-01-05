import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(
    private http: HttpClient,
  ) {

  }

  saveDepartment(department: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}/departments`, department)
  }

  updateDepartment(id: string, department: any): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}/departments/${id}`, department)
  }

  getDepartment(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/departments/${id}`)
  }

  getDepartments(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/departments`)
  }

  deleteDepartment(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseUrl}/departments/${id}`)
  }
}
