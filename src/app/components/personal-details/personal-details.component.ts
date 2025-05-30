import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
  standalone: false
})
export class PersonalDetailsComponent implements OnInit {
  personalForm!: FormGroup;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private service: LeaveService) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'Admin';

    this.personalForm = this.fb.group({
      employeeId: ['', Validators.required],
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      maritalStatus: ['', [Validators.required]],
      nationality: ['', [Validators.required]]
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
          this.personalForm.patchValue(data);

          // Disable form for non-admin
          if (!this.isAdmin) {
            this.personalForm.disable(); // disable entire form
          }
        },
        error: err => console.error('Error loading personal details', err)
      });
    }
  }

  onSubmit(): void {
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched(); // Show all validation errors
      alert('Please fill all required fields correctly.');
      return;
    }
  
    if (this.isAdmin) {
      this.service.savePersonalDetails(this.personalForm.value).subscribe({
        next: (response) => {
          alert(response?.message || 'Details saved successfully');
        },
        error: (error) => {
          alert(error?.error?.message || 'Failed to save details');
        }
      });
    }
  }   
}
