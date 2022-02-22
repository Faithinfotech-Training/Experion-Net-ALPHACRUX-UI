import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { MedicinedocService } from 'src/app/shared/medicinedoc.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  page: number = 1;
  route: any;

  //emits

  constructor(
    public medicineService: MedicinedocService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public app:AppComponent,
    private auth:AuthService
  ) {
    }

  ngOnInit(): void {
    this.medicineService. getMedicines();
    this.medicineService = this.route.snapshot.params['MedicineId'];

  }

  checkoutForm = this.formBuilder.group({
   MedicineId: null,

  });

   onSubmit(): void {

    // Process checkout data here

    if (
      this.checkoutForm.value.MedicineId!= null
    ) {

      console.log(this.checkoutForm.value.MedicineId)
      this.toastr.success('Medicine Added', 'Successfull!');
      this.medicineService.pat.MedicineId = this.checkoutForm.value.PatientId;


      //this.router.navigate(['/doctors/app']);
    }
    else {
      this.toastr.error('Please select a Medicine', 'Error!');
      this.checkoutForm.reset();
    }
  }

  insertPatientMedicineRecord(form?: NgForm) {
    console.log("Inserting a record....");
    this.medicineService.insertMedicine(form.value).subscribe(res => {
      console.log(res);
      this.toastr.success('Patient record Inserted Successfully', 'CMS App V2022');
      this.router.navigateByUrl('/')
    },
      err => {
        console.log(err);
      }
    );
  }

  logout(){
    console.log('inside logout')
    this.auth.logOut();

    this.router.navigateByUrl('/login')
  }

  // postMedicine(){
  //   this.medicineService.generateMedicine()
  // }


}

