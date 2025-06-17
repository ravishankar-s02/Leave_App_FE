import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { LeaveApplication } from '../../models/leave.model';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.css'],
  standalone: false
})
export class MyLeavesComponent implements OnInit {
  rowData: LeaveApplication[] = [];

  columnDefs: ColDef<LeaveApplication>[] = [
    {
      headerName: 'S.No',
      valueGetter: 'node.rowIndex + 1',
      width: 80,
      pinned: 'left',
      headerClass: 'custom-header text-center',
      cellClass: 'text-center fw-semibold',
      filter: false,
      sortable: false
    },
    {
      headerName: 'Leave ID',
      field: 'leaveTypeId',
      width: 120,
      headerClass: 'custom-header text-center',
      cellClass: 'text-center',
      filter: 'agNumberColumnFilter',
      filterParams: { buttons: ['reset', 'apply'], closeOnApply: true }
    },
    {
      headerName: 'Leave Type',
      field: 'typeName',
      width: 140,
      headerClass: 'custom-header',
      cellClass: 'fw-medium',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'], closeOnApply: true }
    },
    {
      headerName: 'From Date',
      field: 'startDate',
      width: 130,
      headerClass: 'custom-header text-center',
      cellClass: 'text-center',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'], closeOnApply: true },
      valueFormatter: params => this.formatDate(params.value)
    },
    {
      headerName: 'To Date',
      field: 'endDate',
      width: 130,
      headerClass: 'custom-header text-center',
      cellClass: 'text-center',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'], closeOnApply: true },
      valueFormatter: params => this.formatDate(params.value)
    },
    {
      headerName: 'Reason',
      field: 'reason',
      width: 200,
      headerClass: 'custom-header',
      cellClass: 'text-wrap',
      autoHeight: true,
      wrapText: true,
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'], closeOnApply: true },
      cellRenderer: (params: { value: any; }) => `<div class="reason-text" title="${params.value}">${params.value}</div>`
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 120,
      headerClass: 'custom-header text-center',
      cellClass: 'text-center',
      filter: 'agSetColumnFilter',
      filterParams: {
        values: ['Pending', 'Approved', 'Rejected'],
        buttons: ['reset', 'apply'],
        closeOnApply: true
      },
      cellRenderer: (params: { value: string; }) => this.renderStatus(params.value)
    },
    {
      headerName: 'Action',
      width: 100,
      headerClass: 'custom-header text-center',
      cellClass: 'text-center',
      filter: false,
      sortable: false,
      cellRenderer: (params: { data: LeaveApplication; }) => this.renderActionButton(params.data),
      onCellClicked: params => {
        if (params.data?.['status']?.toLowerCase() === 'pending') {
          this.cancelLeave(params.data['leaveTypeId']);
        }
      }
    }
  ];

  gridOptions: GridOptions<LeaveApplication> = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      menuTabs: ['filterMenuTab'],
      flex: 1,
      minWidth: 100
    },
    headerHeight: 45,
    rowHeight: 50,
    suppressCellFocus: true,
    animateRows: true,
    suppressMenuHide: true,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [5, 10, 20, 50],
    suppressPaginationPanel: false,
    rowClassRules: {
      'row-approved': params => params.data?.['status']?.toLowerCase() === 'approved',
      'row-rejected': params => params.data?.['status']?.toLowerCase() === 'rejected',
      'row-pending': params => params.data?.['status']?.toLowerCase() === 'pending'
    }
  };

  constructor(private service: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaveData();
  }

  private loadLeaveData(): void {
    const empId = localStorage.getItem('employeeId');
    if (empId) {
      this.service.getLeavesByEmployee(+empId).subscribe({
        next: data => (this.rowData = data),
        error: err => console.error('Failed to load leave applications', err)
      });
    }
  }

  refreshData(): void {
    this.loadLeaveData();
  }

  cancelLeave(leaveId: number): void {
    if (confirm('Are you sure you want to cancel this leave application?')) {
      this.service.cancelLeave(leaveId).subscribe({
        next: () => {
          alert('Leave application cancelled successfully.');
          this.loadLeaveData();
        },
        error: err => {
          alert('Error cancelling leave application. Please try again.');
          console.error(err);
        }
      });
    }
  }

  private formatDate(value: string): string {
    return value ? new Date(value).toLocaleDateString('en-GB') : '';
  }

  private renderStatus(value: string): string {
    if (!value) return '';
  
    const status = value.toLowerCase() as 'approved' | 'rejected' | 'pending';
  
    const badgeMap: Record<'approved' | 'rejected' | 'pending', string> = {
      approved: 'badge bg-success bi-check-circle-fill',
      rejected: 'badge bg-danger bi-x-circle-fill',
      pending: 'badge bg-warning text-dark bi-clock-fill'
    };
  
    const badgeClass = badgeMap[status] ?? 'badge bg-secondary bi-question-circle-fill';
    const [badge, icon] = badgeClass.split(' bi-');
    
    return `<span class="${badge}"><i class="bi bi-${icon} me-1"></i>${value}</span>`;
  }
  

  private renderActionButton(data: LeaveApplication): string {
    const isPending = data?.['status']?.toLowerCase() === 'pending';
    return `
      <button 
        class="btn ${isPending ? 'btn-outline-danger' : 'btn-outline-secondary'} btn-sm px-2 py-1" 
        ${!isPending ? 'disabled' : ''} 
        title="${isPending ? 'Cancel Leave Application' : 'Cannot cancel - Status: ' + data['status']}"
        style="font-size: 0.75rem;">
        <i class="bi ${isPending ? 'bi-x-circle' : 'bi-x-circle-fill'} me-1"></i>
        ${isPending ? 'Cancel' : 'N/A'}
      </button>
    `;
  }
}
