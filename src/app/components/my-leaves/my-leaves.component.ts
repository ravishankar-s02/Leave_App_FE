import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { LeaveApplication } from '../../models/leave.model';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  standalone: false
})
export class MyLeavesComponent implements OnInit {
  leaves: LeaveApplication[] = [];

  constructor(private service: LeaveService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const empId = localStorage.getItem('employeeId');
      if (empId) {
        this.service.getLeavesByEmployee(parseInt(empId)).subscribe({
          next: data => {
            this.leaves = data;
          },
          error: err => {
            console.error('Failed to load leaves', err);
          }
        });
      } else {
        console.warn('Employee ID not found in localStorage');
      }
    }
  }     
}
