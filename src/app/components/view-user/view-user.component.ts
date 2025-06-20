import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  standalone: false
})
export class ViewUserComponent implements OnInit {
  employees: Employee[] | any[] = [];
  selectedEmployeeId: number | null = null;
  selectedEmployee?: Employee;
  personalForm!: FormGroup;
  contactForm!: FormGroup;
  salaryForm!: FormGroup;
  isAdmin = false;
  activeTab: string = 'personal';
  loadingUserDetails = false;
  jobForm: any;

  constructor(private leaveService: LeaveService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.isAdmin = localStorage.getItem('role') === 'Admin';
    this.initForms();
  }

  initForms(): void {
    this.personalForm = this.fb.group({
      employeeId: [null],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      maritalStatus: ['', Validators.required],
      nationality: ['', Validators.required]
    });

    this.contactForm = this.fb.group({
      employeeId: [null],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      alternateNumber: ['', [Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      country: ['', Validators.required]
    });

    this.salaryForm = this.fb.group({
      employeeId: [null],
      payGrade: ['', Validators.required],
      currency: ['', Validators.required],
      basicSalary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      payFrequency: ['', Validators.required]
    });

    this.jobForm = this.fb.group({
      employeeId: [null],
      jobTitle: ['', Validators.required],
      employmentStatus: ['', Validators.required],
      joinedDate: ['', Validators.required],
      location: ['', Validators.required]
    });

    if (!this.isAdmin) {
      this.personalForm.disable();
      this.contactForm.disable();
      this.salaryForm.disable();
      this.jobForm.disable();
    }
  }

  loadEmployees(): void {
    this.leaveService.getAllEmployees().subscribe({
      next: (res) => this.employees = res,
      error: (err) => console.error('Failed to load employees', err)
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  selectUser(employeeId: number): void {
    this.selectedEmployeeId = employeeId;
    this.activeTab = 'personal';
    this.selectedEmployee = this.employees.find(e => e.employeeId === employeeId);
    this.personalForm.reset({ employeeId });
    this.contactForm.reset({ employeeId });
    this.salaryForm.reset({ employeeId });
    this.jobForm.reset({ employeeId });
    this.loadUserDetails(employeeId);
  }

  loadUserDetails(employeeId: number): void {
    this.loadingUserDetails = true;

    this.leaveService.getPersonalDetails(employeeId).subscribe({
      next: (data) => {
        if (data?.dob) data.dob = this.formatDateToLocalYYYYMMDD(data.dob);
        this.personalForm.patchValue({ ...data, employeeId });
      },
      error: (err) => {
        console.error('Error loading personal details', err);
        this.personalForm.reset({ employeeId });
      }
    });

    this.leaveService.getContactDetails(employeeId).subscribe({
      next: (data) => this.contactForm.patchValue({ ...data, employeeId }),
      error: (err) => {
        console.error('Error loading contact details', err);
        this.contactForm.reset({ employeeId });
      },
      complete: () => this.loadingUserDetails = false
    });

    this.leaveService.getSalary(employeeId).subscribe({
      next: (data) => this.salaryForm.patchValue({ ...data, employeeId }),
      error: (err) => {
        console.error('Error loading salary details', err);
        this.salaryForm.reset({ employeeId });
      },
      complete: () => this.loadingUserDetails = false
    });

    this.leaveService.getJob(employeeId).subscribe({
      next: (data: any) => {
        const formattedDate = data.joinedDate
          ? this.formatDateToLocalYYYYMMDD(data.joinedDate)
          : '';

        this.jobForm.patchValue({
          ...data,
          joinedDate: formattedDate,
          employeeId: employeeId
        });
      },
      error: (err) => {
        console.error('Error loading job details:', err);
      }
    });
  }

  onSubmitPersonal(): void {
    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      alert('Please fill all required personal details correctly.');
      return;
    }

    this.leaveService.savePersonalDetails(this.personalForm.value).subscribe({
      next: (res) => alert(res?.message || 'Personal details saved successfully'),
      error: (err) => alert(err?.error?.message || 'Failed to save personal details')
    });
  }

  onSubmitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      alert('Please fill all required contact details correctly.');
      return;
    }

    this.leaveService.saveContactDetails(this.contactForm.value).subscribe({
      next: (res) => alert(res?.message || 'Contact details saved successfully'),
      error: (err) => alert(err?.error?.message || 'Failed to save contact details')
    });
  }

  onSubmitSalary(): void {
    if (this.salaryForm.invalid) {
      this.salaryForm.markAllAsTouched();
      alert('Please fill all required salary details correctly.');
      return;
    }

    const dataToSave = {
      ...this.salaryForm.getRawValue(),
      employeeId: this.selectedEmployeeId
    };

    this.leaveService.saveSalary(dataToSave).subscribe({
      next: () => alert('Salary details saved successfully'),
      error: () => alert('Failed to save salary details')
    });
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
      employeeId: this.selectedEmployeeId
    };

    this.leaveService.saveJob(jobData).subscribe({
      next: (res) => alert(res?.message || 'Details saved successfully'),
      error: (err) => alert(err?.error?.message || 'Failed to save job details')
    });
  }

  private formatDateToLocalYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().substring(0, 10);
  }
}
