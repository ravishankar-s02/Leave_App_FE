import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  username: string = 'User';
  role: string = '';
  showPopup: boolean = false;

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loadUsername();
    this.role = localStorage.getItem('role') ?? 'User';

    // Refresh header name on route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.loadUsername());
  }

  loadUsername(): void {
    const firstName = localStorage.getItem('firstName');
    this.username = firstName?.trim() || 'User';
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  selectSection(section: string): void {
    this.sharedService.setSection(section);
    this.showPopup = false;

    if (section === 'user') {
      this.router.navigate(['/dashboard/personal-details']);
    } else if (section === 'leave') {
      this.router.navigate(['/dashboard/apply-leave']);
    }
  }

  logout(): void {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('adminViewEmployeeId');
    localStorage.removeItem('selectedSection');
    sessionStorage.clear();
  
    // Optional: Clear other application state if needed
    // e.g., reset shared service data if you're using one
  
    // Navigate to login page and prevent back navigation
    this.router.navigate(['/auth'], { replaceUrl: true }).then(() => {
      location.reload(); // Full app reload to reset state
    });
  }  
}
