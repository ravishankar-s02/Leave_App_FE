import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Login } from '../models/login.model';
import { LeaveApplication } from '../models/leave.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private api = 'http://localhost:5140/api';

  constructor(private http: HttpClient) {}

  register(emp: Employee): Observable<any> {
    return this.http.post(`${this.api}/Employee/register`, emp);
  }

  login(data: Login): Observable<Employee> {
    return this.http.post<Employee>(`${this.api}/Employee/login`, data);
  }

  applyLeave(leave: LeaveApplication): Observable<any> {
    return this.http.post(`${this.api}/Leave/apply`, leave);
  }

  getLeavesByEmployee(id: number): Observable<LeaveApplication[]> {
    return this.http.get<LeaveApplication[]>(`${this.api}/Leave/employee/${id}`);
  }

  getAllLeaves(): Observable<LeaveApplication[]> {
    return this.http.get<LeaveApplication[]>(`${this.api}/Leave/all`);
  }

  updateStatus(leaveId: number, status: string): Observable<any> {
    return this.http.put(`${this.api}/Leave/status?leaveId=${leaveId}&status=${status}`, {});
  }

  getPersonalDetails(employeeId: number): Observable<any> {
    return this.http.get<any>(`${this.api}/personal-details/${employeeId}`);
  }

  savePersonalDetails(details: any): Observable<any> {
    return this.http.post(`${this.api}/personal-details/save`, details);
  }
}
