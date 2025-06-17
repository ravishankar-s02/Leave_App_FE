import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

interface PersonalDetails {
  employeeId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  maritalStatus: string;
  nationality: string;
}

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
  standalone: false
})
export class PersonalDetailsComponent implements OnInit {
  personalForm!: FormGroup;
  isAdmin: boolean = false;
  loading: boolean = true;

  constructor(private fb: FormBuilder, private service: LeaveService) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role') === 'Admin';

    this.personalForm = this.fb.group({
      employeeId: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''], // Optional
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      maritalStatus: ['', Validators.required],
      nationality: ['', Validators.required]
    });

    const employeeId = this.getTargetEmployeeId();

    if (employeeId) {
      this.service.getPersonalDetails(+employeeId).subscribe({
        next: (data: PersonalDetails) => {
          if (data?.dob) {
            data.dob = this.formatDateToLocalYYYYMMDD(data.dob);
          }

          this.personalForm.patchValue(data);

          if (!this.isAdmin) {
            this.personalForm.disable(); // Disable for non-admins
          }

          this.loading = false;
        },
        error: err => {
          console.error('Error loading personal details:', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  onSubmit(): void {
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
      return;
    }

    if (this.isAdmin) {
      this.service.savePersonalDetails(this.personalForm.value).subscribe({
        next: response => {
          alert(response?.message || 'Details saved successfully');
        },
        error: error => {
          alert(error?.error?.message || 'Failed to save details');
        }
      });
    }
  }

  private getTargetEmployeeId(): string | null {
    const adminViewId = localStorage.getItem('adminViewEmployeeId');
    const ownId = localStorage.getItem('employeeId');
    return this.isAdmin && adminViewId ? adminViewId : ownId;
  }

  private formatDateToLocalYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().substring(0, 10);
  }
}
