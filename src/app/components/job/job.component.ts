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

  // Fields for reuse in template
  jobFields = [
    { name: 'jobTitle', label: 'Job Title', type: 'text' },
    { name: 'employmentStatus', label: 'Employment Status', type: 'text' },
    { name: 'joinedDate', label: 'Joined Date', type: 'date' },
    { name: 'location', label: 'Location', type: 'text' }
  ];

  constructor(
    private fb: FormBuilder,
    private service: LeaveService
  ) {}

  ngOnInit(): void {
    this.setUserContext();
    this.createForm();
    this.loadJobDetails();
  }

  private setUserContext(): void {
    const role = localStorage.getItem('role');
    const ownId = localStorage.getItem('employeeId');
    const adminViewId = localStorage.getItem('adminViewEmployeeId');

    this.isAdmin = role === 'Admin';
    this.employeeId = this.isAdmin && adminViewId ? +adminViewId : +(ownId ?? 0);
  }

  private createForm(): void {
    this.jobForm = this.fb.group({
      employeeId: [this.employeeId],
      jobTitle: ['', Validators.required],
      employmentStatus: ['', Validators.required],
      joinedDate: ['', Validators.required],
      location: ['', Validators.required]
    });

    if (!this.isAdmin) {
      this.jobForm.disable();
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

  hasError(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return !!control?.errors && (control.touched || control.dirty);
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      alert('Please fill in all required fields.');
      return;
    }

    if (!this.isAdmin) return;

    const jobData = {
      ...this.jobForm.getRawValue(),
      employeeId: this.employeeId
    };

    this.service.saveJob(jobData).subscribe({
      next: (response) => {
        alert(response?.message || 'Details saved successfully.');
      },
      error: (error) => {
        alert(error?.error?.message || 'Failed to save job details.');
      }
    });
  }
}
