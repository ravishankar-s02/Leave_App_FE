import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { LeaveApplication } from '../../models/leave.model';

@Component({
  selector: 'app-my-leaves',
  standalone: false,
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.css']
})
export class MyLeavesComponent implements OnInit {

  // AG Grid Column Definitions
  columnDefs = [
    { headerName: 'Leave No', valueGetter: 'node.rowIndex + 1', width: 100 },
    { headerName: 'Leave ID', field: 'leaveTypeId', width: 100 },
    { headerName: 'Type', field: 'typeName', flex: 1 },
    { headerName: 'Start Date', field: 'startDate', flex: 1 },
    { headerName: 'End Date', field: 'endDate', flex: 1 },
    { headerName: 'Reason', field: 'reason', flex: 2 },
    { headerName: 'Status', field: 'status', flex: 1 }
  ];

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    minWidth: 100,
    flex: 1
  };

  rowData: LeaveApplication[] = [];

  constructor(private service: LeaveService) {}

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeId');
    if (empId) {
      this.service.getLeavesByEmployee(parseInt(empId)).subscribe({
        next: data => this.rowData = data,
        error: err => console.error('Failed to load leave applications', err)
      });
    } else {
      console.warn('Employee ID not found in localStorage');
    }
  }
}
