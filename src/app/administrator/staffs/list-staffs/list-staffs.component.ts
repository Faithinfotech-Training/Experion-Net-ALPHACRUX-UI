import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-list-staffs',
  templateUrl: './list-staffs.component.html',
  styleUrls: ['./list-staffs.component.scss'],
})
export class ListStaffsComponent implements OnInit {
  constructor(public admin: AdminService, private route: Router) {}

  ngOnInit(): void {
    this.admin.getStaffs();
  }

  //Edit/Update staff
  editStaff(staffId: number) {
    console.log(staffId);

    //Redirects to edit form with staffId
    this.route.navigate(['admin/staffs', staffId]);
  }
}
