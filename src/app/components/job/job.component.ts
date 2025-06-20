import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  standalone: false
})
export class JobComponent implements OnInit {
  jobForm!: FormGroup;
  isAdmin: boolean = false;
  employeeId: number = 0;

  constructor(private fb: FormBuilder, private service: LeaveService) {}

  ngOnInit(): void {
    this.setUserContext();
    this.initForm();
    this.loadJobDetails();
  }

  private setUserContext(): void {
    const role = localStorage.getItem('role');
    const ownId = localStorage.getItem('employeeId');
    const adminViewId = localStorage.getItem('adminViewEmployeeId');

    this.isAdmin = role === 'Admin';
    this.employeeId = this.isAdmin && adminViewId ? +adminViewId : +(ownId ?? 0);
  }

  private initForm(): void {
    this.jobForm = this.fb.group({
      employeeId: [this.employeeId],
      jobTitle: ['', Validators.required],
      employmentStatus: ['', Validators.required],
      joinedDate: ['', Validators.required],
      location: ['', Validators.required]
    });

    if (!this.isAdmin) {
      this.jobForm.disable(); // Read-only for non-admin
    }
  }

  private loadJobDetails(): void {
    if (!this.employeeId) return;

    this.service.getJob(this.employeeId).subscribe({
      next: (data: any) => {
        const formattedDate = data.joinedDate
          ? this.formatDateToLocalYYYYMMDD(data.joinedDate)
          : '';

        this.jobForm.patchValue({
          ...data,
          joinedDate: formattedDate,
          employeeId: this.employeeId
        });
      },
      error: (err) => {
        console.error('Error loading job details:', err);
      }
    });
  }

  private formatDateToLocalYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().substring(0, 10);
  }

  onSubmit(): void {
    if (!this.isAdmin) return;

    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      alert('Please fill in all required fields.');
      return;
    }

    const jobData = {
      ...this.jobForm.getRawValue(),
      employeeId: this.employeeId
    };

    this.service.saveJob(jobData).subscribe({
      next: (res) => alert(res?.message || 'Details saved successfully'),
      error: (err) => alert(err?.error?.message || 'Failed to save job details')
    });
  }

  hasError(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return !!control?.errors && (control.touched || control.dirty);
  }
}
