import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  flag: boolean = false;
  datepipe: DatePipe = new DatePipe('en-US');

  myForm = this.fb.group({
    MedicineId: 0,
    MedicineName: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9- ]*$')],
    ],
    MedicinePrice: ['', [Validators.required, Validators.pattern('^[0-9 ]*$')]],
    ExpiryDate: ['', Validators.required],
    ManufacturingDate: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public activeRoute: ActivatedRoute,
    public route: Router,
    public admin: AdminService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.admin.getMedicineDetails();
  }

  onSubmit() {
    console.log(this.myForm.value);

    //Inserting to database
    this.insertMedicine();
    this.myForm.reset();
    this.admin.getMedicineDetails();
  }

  //Method to insert staff
  insertMedicine() {
    console.log('Inserting values.....');
    this.check();
    if (this.flag) {
      this.toast.error('Medicine already exists', 'Error');
      this.flag = false;
    }
    else {
      this.admin.addMedicine(this.myForm.value).subscribe(
        (response) => {
          console.log(response);
          this.toast.success('Medicine Added Successfully', 'Success');
          this.admin.getMedicineDetails();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  //Check if medicine already exists
  check() {
    for (let item of this.admin.medicineDetails) {
        console.log(item.MedicineName);
      if (
        item.MedicineName.toLowerCase() ===
        this.myForm.value.MedicineName.toLowerCase()
      ) {
        this.flag = true;
        console.log('Medicine already exists');
        break;
      }
    }
  }
}


