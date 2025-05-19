import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false
})
export class RegisterComponent {
  emp: Employee = { name: '', email: '', password: '' };

  constructor(private service: LeaveService, private router: Router) {}

  register() {
    this.service.register(this.emp).subscribe({
      next: res => {
        alert('Registered successfully!');
        this.router.navigate(['/']); // navigate to login
      },
      error: err => {
        if (err.status === 200) {
          alert('Registered successfully!');
          this.router.navigate(['/']);
        } else {
          alert('Registration failed');
          console.error(err);
        }
      }
    });
  }
}
