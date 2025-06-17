import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Login } from '../models/login.model';
import { LeaveApplication } from '../models/leave.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private api = 'http://localhost:5140/api';

  constructor(private http: HttpClient) {}

  // ✅ Register new employee
  register(emp: Employee): Observable<string> {
    return this.http.post(`${this.api}/Employee/register`, emp, {
      responseType: 'text'
    });
  }

  // ✅ Login employee
  login(data: Login): Observable<any> {
    return this.http.post(`${this.api}/Employee/login`, data);
  }

  // ✅ Get all employees
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.api}/Employee/all`);
  }

  // ✅ Get all leaves
  getAllLeaves(): Observable<LeaveApplication[]> {
    return this.http.get<LeaveApplication[]>(`${this.api}/Leave/all`);
  }

  // ✅ Apply for leave
  applyLeave(leave: LeaveApplication): Observable<any> {
    return this.http.post(`${this.api}/Leave/apply`, leave);
  }

  // ✅ Get leaves by employee ID
  getLeavesByEmployee(id: number): Observable<LeaveApplication[]> {
    return this.http.get<LeaveApplication[]>(`${this.api}/Leave/employee/${id}`);
  }

  // ✅ Update leave status (admin use)
  updateLeaveStatus(leaveId: number, status: string): Observable<any> {
    return this.http.put(`${this.api}/Leave/status?leaveId=${leaveId}&status=${status}`, {});
  }

  // ✅ Cancel leave request
  cancelLeave(leaveId: number): Observable<string> {
    return this.http.delete(`${this.api}/Leave/cancel/${leaveId}`, { responseType: 'text' });
  }

  // ✅ Get personal details
  getPersonalDetails(employeeId: number): Observable<any> {
    return this.http.get(`${this.api}/personal-details/${employeeId}`);
  }

  // ✅ Save personal details
  savePersonalDetails(details: any): Observable<any> {
    return this.http.post(`${this.api}/personal-details/save`, details);
  }

  // ✅ Get contact details
  getContactDetails(employeeId: number): Observable<any> {
    return this.http.get(`${this.api}/contact-details/${employeeId}`);
  }

  // ✅ Save contact details
  saveContactDetails(details: any): Observable<any> {
    return this.http.post(`${this.api}/contact-details/save`, details);
  }

  // ✅ Get job details
  getJob(employeeId: number): Observable<any> {
    return this.http.get(`${this.api}/job/${employeeId}`);
  }

  // ✅ Save job details
  saveJob(details: any): Observable<any> {
    return this.http.post(`${this.api}/job/save`, details);
  }

  // ✅ Get Salary details
  getSalary(employeeId: number): Observable<any> {
    return this.http.get(`${this.api}/salary/${employeeId}`);
  }

  // ✅ Save Salary details
  saveSalary(details: any): Observable<any> {
    return this.http.post(`${this.api}/salary/save`, details);
  }

  // ✅ Get leave summary
  getLeaveSummary(employeeId: number): Observable<any> {
    return this.http.get(`${this.api}/leave-summary/${employeeId}`);
  }

  // ✅ Upload leave balance (admin use)
  uploadLeaveBalance(data: any): Observable<any> {
    return this.http.post(`${this.api}/leave-summary/upload-balance`, data);
  }
}
