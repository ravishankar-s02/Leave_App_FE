import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  standalone: false
})
export class JobComponent implements OnInit {
  jobForm!: FormGroup;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private service: LeaveService) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'Admin';

    this.jobForm = this.fb.group({
      employeeId: [''],
      job: [''],
      status: [''],
      joinedDate: [''],
      location: ['']
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
          this.jobForm.patchValue(data);

          // Disable form for non-admin
          if (!this.isAdmin) {
            this.jobForm.disable(); // disable entire form
          }
        },
        error: err => console.error('Error loading personal details', err)
      });
    }
  }

  onSubmitts(): void {
    if (this.jobForm.valid && this.isAdmin) {
      this.service.savePersonalDetails(this.jobForm.value).subscribe({
        next: () => alert('Details saved successfully'),
        error: () => alert('Failed to save details')
      });
    }
  }
}
