import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: string = '';

  ngOnInit() {
    this.role = localStorage.getItem('role') || 'User'; // default to 'User'
  }
}
