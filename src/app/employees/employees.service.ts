import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient,
  ) { }

  saveEmployee(employee: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}/employees`, employee)
  }

  updateEmployee(id: string, employee: any): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}/employees/${id}`, employee)
  }

  getEmployee(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/employees/${id}`)
  }

  getEmployeeByDepartment(departmentId: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/employees/${departmentId}/department`)
  }

  getEmployees(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/employees`)
  }

  deleteEmployee(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseUrl}/employees/${id}`)
  }
}
