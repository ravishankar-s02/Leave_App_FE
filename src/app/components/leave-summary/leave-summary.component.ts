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

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    const employeeId = Number(localStorage.getItem('employeeId'));
    if (!employeeId) {
      this.hasError = true;
      console.error('Invalid or missing employeeId');
      return;
    }

    this.leaveService.getLeaveSummary(employeeId).subscribe({
      next: (data) => this.leaveSummary = data || [],
      error: (err) => {
        console.error(err);
        this.hasError = true;
      }
    });
  }
}
