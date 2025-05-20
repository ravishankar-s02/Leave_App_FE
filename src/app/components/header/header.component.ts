import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent {
  username = localStorage.getItem('username') || 'User';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('employeeId');
    this.router.navigate(['/login']);
  }
}
