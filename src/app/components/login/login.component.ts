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
  loginData: Login = { email: '', password: '' };

  constructor(private service: LeaveService, private router: Router) {}

  login() {
    this.service.login(this.loginData).subscribe({
      next: res => {
        if (res.employeeId !== undefined && res.employeeId !== null) {
          localStorage.setItem('employeeId', res.employeeId.toString());
          this.router.navigate(['/apply-leave']);
        } else {
          alert('Login successful, but employee ID is missing.');
        }
      },
      error: () => alert('Invalid login credentials')
    });
  }
}
