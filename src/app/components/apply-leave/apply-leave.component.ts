import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveApplication } from '../../models/leave.model';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  standalone: false
})
export class ApplyLeaveComponent {
  leave: LeaveApplication = {
    employeeId: 0,
    leaveTypeId: 1,
    startDate: '',
    endDate: '',
    reason: ''
  };

  constructor(private service: LeaveService, private router: Router) {
    const id = localStorage.getItem('employeeId');
    this.leave.employeeId = id ? parseInt(id) : 0;
  }

  apply() {
    this.service.applyLeave(this.leave).subscribe({
      next: (res: any) => {
        alert(res.message || 'Leave applied successfully!');
        // this.router.navigate(['/my-leaves']);
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to apply leave.');
        console.error(err);
      }
    });
  }
}
