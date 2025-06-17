import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: false
})
export class SidebarComponent implements OnInit {
  role: string = '';
  selectedSection: string = 'leave'; // default

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') ?? 'User';

    this.sharedService.section$.subscribe((section: string) => {
      this.selectedSection = section;
    });
  }

  isAdmin(): boolean {
    return this.role === 'Admin';
  }

  isLeaveSection(): boolean {
    // Users only see leave section, Admin sees when selectedSection is leave
    return this.selectedSection === 'leave' || this.role === 'User';
  }

  isUserSection(): boolean {
    // Admin-only section
    return this.selectedSection === 'user' && this.role === 'Admin';
  }

  isAllocationSection(): boolean {
    // Show allocation section only for Admins when selectedSection is 'leave'
    return this.role === 'Admin' && this.selectedSection === 'leave';
  }

  isAllLeavesSection(): boolean {
    return this.role === 'Admin' && this.selectedSection === 'leave';
  }
  
}
