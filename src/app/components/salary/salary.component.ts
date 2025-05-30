import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],
  standalone: false
})
export class SalaryComponent implements OnInit {
  salaryForm!: FormGroup;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private service: LeaveService) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'Admin';

    this.salaryForm = this.fb.group({
      employeeId: [''],
      payGrade: [''],
      currency: [''],
      basicSalary: [''],
      payFrequency: ['']
    });

    // Determine whose data to load: own or admin-view
    let employeeId = localStorage.getItem('employeeId');
    const adminViewId = localStorage.getItem('adminViewEmployeeId');
    if (this.isAdmin && adminViewId) {
      employeeId = adminViewId;
    }

    if (employeeId) {
      this.service.getPersonalDetails(+employeeId).subscribe({
        next: data => {
          // Format the date to yyyy-MM-dd
          if (data.dob) {
            const dob = new Date(data.dob);
            const formattedDob = dob.toISOString().split('T')[0];
            data.dob = formattedDob;
          }
          this.salaryForm.patchValue(data);

          // Disable form for non-admin
          if (!this.isAdmin) {
            this.salaryForm.disable(); // disable entire form
          }
        },
        error: err => console.error('Error loading personal details', err)
      });
    }
  }

  onSubmitts(): void {
    if (this.salaryForm.valid && this.isAdmin) {
      this.service.savePersonalDetails(this.salaryForm.value).subscribe({
        next: () => alert('Details saved successfully'),
        error: () => alert('Failed to save details')
      });
    }
  }
}
