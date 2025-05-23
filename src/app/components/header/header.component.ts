import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent {
  username: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // const storedUsername = localStorage.getItem('name');
    this.username = localStorage?.getItem('name') ? localStorage.getItem('name') : 'User';
  }  

  logout() {
    localStorage.removeItem('employeeId');
    this.router.navigate(['/login']);
  }
}
