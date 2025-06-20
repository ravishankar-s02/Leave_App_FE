import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import { Router } from '@angular/router'; // ✅ Import this

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: false
})
export class ForgotPasswordComponent {
  form: FormGroup;
  message: string = '';
error: any;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router // ✅ Inject router here
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit(): void {
    const email = this.form.value.email;
    this.leaveService.sendResetLink(email).subscribe({
      next: (res) => {
        this.message = 'Reset link sent!';
        // ✅ Navigate to reset-password page with token
        this.router.navigate(['/reset-password'], {
          queryParams: { token: res.token }
        });
      },
      error: (err) => {
        this.message = err.error.message || 'Something went wrong';
      }
    });
  }
}
