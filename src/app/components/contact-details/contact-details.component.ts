import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  standalone: false
})
export class ContactDetailsComponent implements OnInit {
  contactForm!: FormGroup;
  isAdmin: boolean = false;

  constructor(private fb: FormBuilder, private service: LeaveService) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'Admin';

    this.contactForm = this.fb.group({
      employeeId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      alternateNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
    

    // Determine whose data to load: own or admin-view
    let employeeId = localStorage.getItem('employeeId');
    const adminViewId = localStorage.getItem('adminViewEmployeeId');
    if (this.isAdmin && adminViewId) {
      employeeId = adminViewId;
    }

    if (employeeId) {
      this.service.getContactDetails(+employeeId).subscribe({
        next: data => {
          // Format the date to yyyy-MM-dd
          if (data.dob) {
            const dob = new Date(data.dob);
            const formattedDob = dob.toISOString().split('T')[0];
            data.dob = formattedDob;
          }
          this.contactForm.patchValue(data);

          // Disable form for non-admin
          if (!this.isAdmin) {
            this.contactForm.disable(); // disable entire form
          }
        },
        error: err => console.error('Error loading personal details', err)
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // Show all validation errors
      alert('Please fill all required fields correctly.');
      return;
    }
  
    if (this.isAdmin) {
      this.service.saveContactDetails(this.contactForm.value).subscribe({
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
