export interface LeaveApplication {
[x: string]: any;
    employeeId: number;
    TypeName: string;
    startDate: string; // Use ISO string like '2025-05-15'
    endDate: string;
    reason: string;
  }
  