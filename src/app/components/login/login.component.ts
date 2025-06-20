import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  loginData = {
    firstName: '',
    password: ''
  };

  isLoading = false;
  errorMsg = '';

  constructor(private service: LeaveService, private router: Router) {}

  login(): void {
    this.isLoading = true;
    this.errorMsg = '';

    this.service.login(this.loginData).subscribe({
      next: (res) => {
        this.isLoading = false;

        if (res?.employeeId) {
          localStorage.setItem('token', 'valid');
          localStorage.setItem('employeeId', res.employeeId.toString());
          localStorage.setItem('firstName', res.firstName);
          localStorage.setItem('role', res.role);
          localStorage.removeItem('adminViewEmployeeId');

          this.router.navigate(['/dashboard/apply-leave'], { replaceUrl: true });
        } else {
          this.errorMsg = 'Login failed: Invalid response from server.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMsg = 'Invalid login credentials. Please try again.';
      }
    });
  }
}
