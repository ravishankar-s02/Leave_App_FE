import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css'],
  standalone: false
})
export class SalaryComponent implements OnInit {
  salaryForm!: FormGroup;
  isAdmin: boolean = false;
  employeeId: number = 0;

  constructor(private fb: FormBuilder, private service: LeaveService) {}

  ngOnInit(): void {
    this.setUserContext();
    this.initForm();
    this.loadSalaryDetails();
  }

  private setUserContext(): void {
    const role = localStorage.getItem('role');
    const ownId = localStorage.getItem('employeeId');
    const adminViewId = localStorage.getItem('adminViewEmployeeId');

    this.isAdmin = role === 'Admin';
    this.employeeId = this.isAdmin && adminViewId ? +adminViewId : +(ownId ?? 0);
  }

  private initForm(): void {
    this.salaryForm = this.fb.group({
      employeeId: [this.employeeId],
      payGrade: [''],
      currency: [''],
      basicSalary: [''],
      payFrequency: ['']
    });

    if (!this.isAdmin) {
      this.salaryForm.disable(); // Read-only for non-admin
    }
  }

  private loadSalaryDetails(): void {
    if (!this.employeeId) return;

    this.service.getSalary(this.employeeId).subscribe({
      next: (data) => {
        this.salaryForm.patchValue({
          ...data,
          employeeId: this.employeeId
        });
      },
      error: (err) => {
        console.error('Error loading salary details:', err);
      }
    });
  }

  onSubmitts(): void {
    if (!this.isAdmin) return;

    const dataToSave = {
      ...this.salaryForm.getRawValue(),
      employeeId: this.employeeId
    };

    this.service.saveSalary(dataToSave).subscribe({
      next: () => alert('Details saved successfully'),
      error: () => alert('Failed to save details')
    });
  }
}
