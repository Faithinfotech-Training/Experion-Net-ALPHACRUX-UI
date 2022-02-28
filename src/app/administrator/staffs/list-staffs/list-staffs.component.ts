import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import { StaffsComponent } from '../staffs.component';

@Component({
  selector: 'app-list-staffs',
  templateUrl: './list-staffs.component.html',
  styleUrls: ['./list-staffs.component.scss'],
})
export class ListStaffsComponent implements OnInit {

  search: string;
  constructor(
    public admin: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    public staffs: StaffsComponent
  ) {}

  ngOnInit(): void {
    this.admin.getStaffs();
  }

  //Edit/Update staff
  editStaff(staffId: number) {
    console.log(staffId);
    this.admin.getStaffs();
    //Redirects to edit form with staffId
    this.router.navigate(['admin/staffs/edit', staffId]);
  }
}
