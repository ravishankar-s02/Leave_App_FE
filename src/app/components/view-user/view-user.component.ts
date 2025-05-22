import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  standalone: false
})
export class ViewUserComponent {
  employeeId: string = '';

  constructor(private router: Router) {}

  onView(): void {
    if (this.employeeId.trim()) {
      localStorage.setItem('adminViewEmployeeId', this.employeeId);
      this.router.navigate(['/dashboard/personal-details']);
    } else {
      alert('Please enter a valid Employee ID');
    }
  }
}
