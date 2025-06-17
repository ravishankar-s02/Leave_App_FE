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
  emp: Employee = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    gender: undefined,
    dob: '',
    nationality: undefined,
    maritalStatus: undefined
  };

  isSubmitting = false;

  constructor(private service: LeaveService, private router: Router) {}

  register() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    this.service.register(this.emp).subscribe({
      next: res => {
        this.isSubmitting = false;

        if (res === 'Registered successfully.') {
          alert('Registered successfully!');
          this.router.navigate(['/']);
        } else {
          alert(res); // e.g. "Email already exists"
        }
      },
      error: err => {
        this.isSubmitting = false;
        alert('Registration failed.');
        console.error(err);
      }
    });
  }
}
