import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-medicine',
  templateUrl: './new-medicine.component.html',
  styleUrls: ['./new-medicine.component.scss'],
})
export class NewMedicineComponent implements OnInit {
  medicineId: number = 0;
  datepipe: DatePipe = new DatePipe('en-US');

  

  myForm = this.fb.group({
    MedicineId: 0,
    MedicineName: ['', Validators.required],
    MedicinePrice: ['', Validators.required],
    ExpiryDate: ['', Validators.required],
    ManufacturingDate: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public activeRoute: ActivatedRoute,
    public route: Router,
    public admin: AdminService,
    private toast: ToastrService
  ) {  }

  ngOnInit(): void {

    //Get MedicineId from Activated Route
    this.medicineId = this.activeRoute.snapshot.params['medicineId'];

    // //Get Staff by id
    // if (this.medicineId != 0 || this.medicineId != null) {
    //   //Get employee by id
    //   this.admin.getStaffById(this.medicineId).subscribe(
    //     (response) => {
    //       console.log(response);
    //       response.StaffDob = this.datepipe.transform(
    //         response.StaffDob,
    //         'yyyy-MM-dd'
    //       );
    //       response.StaffJoiningDate = this.datepipe.transform(
    //         response.StaffJoiningDate,
    //         'yyyy-MM-dd'
    //       );

    //       //Assign response to form myForm
    //       this.myForm.patchValue(response);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // }
  }

  onSubmit() {
    console.log(this.myForm.value);
    let medicineId = this.myForm.value.MedicineId;

    //check if medicineId is 0 then create new staff
    if (medicineId == 0) {
      //Inserting to database
      this.insertMedicine();
      this.myForm.reset();
    }
    //else {
    //   //Updating staff
    //   this.editStaff();
    //   this.myForm.reset();
    //   // this.route.navigate(['admin/staffs/list']);
    // }
  }

  //Method to insert staff
  insertMedicine() {
    console.log('Inserting values.....');
    this.admin.addMedicine(this.myForm.value).subscribe(
      (response) => {
        console.log(response);
        this.toast.success('Medicine Added Successfully', 'Success');
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
