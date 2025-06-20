import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: false
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private leaveService: LeaveService,
    private router: Router
  ) {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  submit(): void {
    if (!this.token) {
      alert('Reset token missing');
      return;
    }

    this.leaveService.resetPassword(this.token, this.form.value.newPassword).subscribe({
      next: () => {
        alert('Password reset successful');
        this.router.navigate(['/auth']);
      },
      error: (err) => alert(err.error.message)
    });
  }
}
