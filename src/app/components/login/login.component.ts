import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:false
})
export class LoginComponent {
  loginData: Login = { name: '', password: '' };

  constructor(private service: LeaveService, private router: Router) {}

  login() {
    this.service.login(this.loginData).subscribe({
      next: res => {
        if (res.employeeId) {
          localStorage.setItem('employeeId', res.employeeId.toString());
          localStorage.setItem('name', res.name); // assuming 'name' comes from backend
          localStorage.setItem('role', res.role); // 👈 save role
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login successful, but employee ID is missing.');
        }
      },
      error: () => alert('Invalid login credentials')
    });    
  }  
}
