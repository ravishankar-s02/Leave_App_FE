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
  employeeId!: number;

  constructor(private fb: FormBuilder, private service: LeaveService) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role') === 'Admin';
    const ownId = localStorage.getItem('employeeId');
    const adminViewId = localStorage.getItem('adminViewEmployeeId');
    this.employeeId = this.isAdmin && adminViewId ? +adminViewId : +(ownId || 0);

    this.contactForm = this.fb.group({
      employeeId: [this.employeeId],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      alternateNumber: ['', [Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      country: ['', Validators.required]
    });

    if (this.employeeId) {
      this.service.getContactDetails(this.employeeId).subscribe({
        next: data => {
          this.contactForm.patchValue({ ...data, employeeId: this.employeeId });
          if (!this.isAdmin) this.contactForm.disable();
        },
        error: err => console.error('Error loading contact details:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      alert('Please fill all required fields correctly.');
      return;
    }

    const contactData = { ...this.contactForm.value, employeeId: this.employeeId };

    this.service.saveContactDetails(contactData).subscribe({
      next: (res) => alert(res?.message || 'Details saved successfully'),
      error: (err) => alert(err?.error?.message || 'Failed to save details')
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.errors && (control.touched || control.dirty));
  }  
}
