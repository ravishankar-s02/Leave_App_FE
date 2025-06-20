import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';

interface LeaveSummary {
  leaveType: string;
  leaveTaken: number;
  leaveScheduled: number;
  leaveRemaining: number;
}

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrls: ['./leave-summary.component.css'],
  standalone: false
})
export class LeaveSummaryComponent implements OnInit {
  leaveSummary: LeaveSummary[] = [];
  currentYear: number = new Date().getFullYear();
  hasError: boolean = false;
  employeeId: number = 0;

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.setUserContext();
    this.loadLeaveSummary();
  }

  private setUserContext(): void {
    const role = localStorage.getItem('role');
    const ownId = localStorage.getItem('employeeId');
    const adminViewId = localStorage.getItem('adminViewEmployeeId');

    this.employeeId = role === 'Admin' && adminViewId
      ? +adminViewId
      : +(ownId ?? 0);
  }

  private loadLeaveSummary(): void {
    if (!this.employeeId) {
      this.hasError = true;
      console.error('Invalid or missing employeeId');
      return;
    }

    this.leaveService.getLeaveSummary(this.employeeId).subscribe({
      next: (data) => this.leaveSummary = data || [],
      error: (err) => {
        console.error('Error fetching leave summary:', err);
        this.hasError = true;
      }
    });
  }
}
