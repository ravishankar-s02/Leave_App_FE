import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-personal-details',
  templateUrl: './contact-details.component.html',
  standalone:false
})
export class ContactDetailsComponent implements OnInit {
  contactForm!: FormGroup;
isAdmin: any;
 
  constructor(private fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.contactForm = this.fb.group({ 
      // Contact Details
      phoneNumber: [''],
      altNumber: [''],
      email: [''],
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: ['']
    });
  }
 
  onSubmit() {
    console.log(this.contactForm.value);
  }
}