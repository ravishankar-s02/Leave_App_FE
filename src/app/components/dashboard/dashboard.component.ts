import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employeeId: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.employeeId = idParam ? parseInt(idParam, 10) : 0;

    // Optional: log or handle invalid IDs
    if (!this.employeeId) {
      console.warn('Invalid or missing employee ID in route');
    }

    // You can now use this.employeeId to load data
  }
}
