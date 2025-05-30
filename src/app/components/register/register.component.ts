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
  emp: Employee = { name: '', email: '', password: '', role: '' };

  constructor(private service: LeaveService, private router: Router) {}

  register() {
    this.service.register(this.emp).subscribe({
      next: res => {
        if (res === 'Registered successfully.') {
          alert('Registered successfully!');
          this.router.navigate(['/']);
        } else {
          alert(res); // Show error like "Email already exists."
        }
      },
      error: err => {
        alert('Registration failed.');
        console.error(err);
      }
    });
  }  
}
