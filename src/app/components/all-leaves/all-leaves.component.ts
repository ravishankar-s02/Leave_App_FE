import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { LeaveApplication } from '../../models/leave.model';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  standalone: false
})
export class AllLeavesComponent implements OnInit {
  leaves: LeaveApplication[] = [];

  constructor(private service: LeaveService) {}

  ngOnInit(): void {
    this.service.getAllLeaves().subscribe(data => {
      this.leaves = data;
    });
  }

  updateStatus(id: number, status: string) {
    this.service.updateStatus(id, status).subscribe(res => {
      alert(res);
      this.ngOnInit();
    });
  }
}
