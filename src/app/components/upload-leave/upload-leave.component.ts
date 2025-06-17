import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-upload-leave',
  templateUrl: './upload-leave.component.html',
  styleUrls: ['./upload-leave.component.css'],
  standalone: false
})
export class UploadLeaveComponent {
  uploadForm: FormGroup;
  leaveTypes = ['Casual', 'LOP', 'OT', 'Comp Off'];
  isSubmitting = false;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.uploadForm = this.fb.group({
      employeeId: ['', Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(2000)]],
      balances: this.fb.group({
        Casual: [0, [Validators.required, Validators.min(0)]],
        LOP: [0, [Validators.required, Validators.min(0)]],
        OT: [0, [Validators.required, Validators.min(0)]],
        'Comp Off': [0, [Validators.required, Validators.min(0)]]
      })
    });
  }

  submit() {
    if (this.uploadForm.invalid) {
      this.uploadForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { employeeId, year, balances } = this.uploadForm.value;
    const uploads = this.leaveTypes.map(type => {
      return this.leaveService.uploadLeaveBalance({
        employeeID: employeeId,
        year,
        leaveType: type,
        leaveRemaining: balances[type]
      });
    });

    Promise.all(uploads.map(obs => obs.toPromise()))
      .then(() => {
        alert('Leave balances uploaded successfully!');
        this.uploadForm.reset({
          employeeId: '',
          year: new Date().getFullYear(),
          balances: {
            Casual: 0,
            LOP: 0,
            OT: 0,
            'Comp Off': 0
          }
        });
      })
      .catch(error => {
        console.error('Upload failed', error);
        alert('Upload failed. Please try again.');
      })
      .finally(() => {
        this.isSubmitting = false;
      });
  }
}
