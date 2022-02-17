import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.scss'],
})
export class NewStaffComponent implements OnInit {

  staffId: number =0;

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
    StaffJoiningDate:[this.date=this.formattedDate],    //Default date is today's date
    RoleId: [0],
    QualificationId: [0],
  });

  constructor(private fb: FormBuilder,public activeRoute: ActivatedRoute, public admin: AdminService,private toast: ToastrService ) {}

  ngOnInit(): void {
    this.admin.getRoles();
    this.admin.getQualifications();

    this.staffId = this.activeRoute.snapshot.params['staffId'];

    //Get Staff by id
    if (this.staffId != 0 || this.staffId != null) {
      //Get employee by id
      this.admin.getStaffById(this.staffId).subscribe(
        (response) => {
          console.log(response);

          //Format date
          // var datePipe = new DatePipe('en-UK');
          // let formattedDate: any = datePipe.transform(
          //   response.DateOfJoining,
          //   'yyyy-MM-dd'
          // );
          // response.DateOfJoining = formattedDate;
          // //Assign this response to empservice formData
          // this.admin.formData = Object.assign({}, response);
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
      console.log('Inserting values.....');
      this.admin.addStaff(this.myForm.value);
      this.myForm.reset();
      this.toast.success('Staff Added Successfully', 'Success');
    }
  }

}
