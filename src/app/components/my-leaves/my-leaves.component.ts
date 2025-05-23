import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { LeaveApplication } from '../../models/leave.model';

@Component({
  selector: 'app-my-leaves',
  standalone:false,
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.css']
})
export class MyLeavesComponent implements OnInit {
  columnDefs = [
    { headerName: 'Leave No', valueGetter: 'node.rowIndex + 1' },
    { headerName: 'Leave ID', field: 'leaveTypeId' },
    { headerName: 'Type', field: 'typeName' },
    { headerName: 'Start', field: 'startDate' },
    { headerName: 'End', field: 'endDate' },
    { headerName: 'Reason', field: 'reason' },
    { headerName: 'Status', field: 'status' }
  ];

  rowData: LeaveApplication[] = [];

  constructor(private service: LeaveService) {}

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeId');
    if (empId) {
      this.service.getLeavesByEmployee(parseInt(empId)).subscribe({
        next: data => {
          this.rowData = data;
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
