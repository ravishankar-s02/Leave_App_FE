import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { LeaveApplication } from '../../models/leave.model';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrls: ['./all-leaves.component.css'],
  standalone: false
})
export class AllLeavesComponent implements OnInit {
  leaves: LeaveApplication[] = [];

  constructor(private service: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.service.getAllLeaves().subscribe({
      next: (data: LeaveApplication[]) => this.leaves = data,
      error: err => console.error('Failed to load leaves', err)
    });
  }

  updateStatus(leaveId: number, status: string): void {
    this.service.updateLeaveStatus(leaveId, status).subscribe({
      next: res => {
        alert(res.message || 'Leave status updated successfully');
        this.loadLeaves(); // Refresh the table
      },
      error: err => {
        console.error('Failed to update status', err);
        alert('Error updating leave status');
      }
    });
  }
}
