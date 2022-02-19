import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/admin.service';
import { StaffsComponent } from '../staffs.component';

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.scss'],
})
export class NewStaffComponent implements OnInit {
  staffId: number = 0;

  //Todays date formatting to yyyy-mm-dd
  date: Date = new Date();
  datepipe: DatePipe = new DatePipe('en-US');
  formattedDate: any = this.datepipe.transform(this.date, 'yyyy-MM-dd');

  myForm = this.fb.group({
    StaffId: 0,
    StaffName: ['', Validators.required],
    StaffPhone: ['', Validators.required],
    StaffAddress: ['', Validators.required],
    StaffEmail: ['', Validators.required],
    StaffDob: ['', Validators.required],
    StaffJoiningDate: [(this.date = this.formattedDate), Validators.required], //Default date is today's date
    RoleId: ['', Validators.required],
    QualificationId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public activeRoute: ActivatedRoute,
    public route: Router,
    public admin: AdminService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.admin.getRoles();
    this.admin.getQualifications();

    //Get staffId from Activated Route
    this.staffId = this.activeRoute.snapshot.params['staffId'];

    //Get Staff by id
    if (this.staffId != 0 || this.staffId != null) {
      //Get stffId by id
      this.admin.getStaffById(this.staffId).subscribe(
        (response) => {
          console.log(response);
          response.StaffDob = this.datepipe.transform(
            response.StaffDob,
            'yyyy-MM-dd'
          );
          response.StaffJoiningDate = this.datepipe.transform(
            response.StaffJoiningDate,
            'yyyy-MM-dd'
          );

          //Assign response to form myForm
          this.myForm.patchValue(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onSubmit() {
    console.log(this.myForm.value);
    let staffId = this.myForm.value.StaffId;

    //check if staffId is 0 then create new staff
    if (staffId == 0) {
      //Inserting to database
      this.insertStaff();
      this.myForm.reset();
    } else {
      //Updating staff
      this.editStaff();
      this.myForm.reset();
      this.route.navigate(['admin/staffs/list']);
    }
  }

  //Method to insert staff
  insertStaff() {
    console.log('Inserting values.....');
    this.admin.addStaff(this.myForm.value).subscribe(
      (response) => {
        console.log(response);
        this.toast.success('Staff Added Successfully', 'Success');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Method to update staff
  editStaff() {
    console.log('Updating values.....');
    this.admin.updateStaff(this.myForm.value).subscribe(
      (response) => {
        console.log(response);
        this.toast.success('Staff Updated Successfully', 'Success');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
