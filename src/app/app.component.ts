import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'leave-app';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Check if user is logged in (i.e., token or role exists)
    const isLoggedIn = localStorage.getItem('role') && localStorage.getItem('firstName');

    if (!isLoggedIn && this.router.url !== '/login') {
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    // ✅ Set default section only if not already set
    if (!localStorage.getItem('selectedSection')) {
      localStorage.setItem('selectedSection', 'leave');
    }
  }
}
