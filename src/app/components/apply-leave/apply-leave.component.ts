import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveApplication } from '../../models/leave.model';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
  standalone: false
})
export class ApplyLeaveComponent {
  leave: LeaveApplication = {
    employeeId: 0,
    TypeName: '',
    startDate: '',
    endDate: '',
    reason: ''
  };

  constructor(private service: LeaveService, private router: Router) {
    const id = localStorage.getItem('employeeId');
    this.leave.employeeId = id ? parseInt(id) : 0;
  }

  apply(): void {
    this.service.applyLeave(this.leave).subscribe({
      next: (res: { message: string }) => {
        alert(res.message || 'Leave applied successfully!');
        this.resetForm();
        this.router.navigate(['/my-leaves']);
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to apply leave.');
        console.error(err);
      }
    });
  }

  resetForm(): void {
    this.leave = {
      employeeId: this.leave.employeeId,
      TypeName: '',
      startDate: '',
      endDate: '',
      reason: ''
    };
  }
}
