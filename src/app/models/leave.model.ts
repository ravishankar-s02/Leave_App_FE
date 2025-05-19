export interface LeaveApplication {
[x: string]: any;
    employeeId: number;
    leaveTypeId: number;
    startDate: string; // Use ISO string like '2025-05-15'
    endDate: string;
    reason: string;
  }
  