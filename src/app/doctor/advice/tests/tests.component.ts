import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { DoctorAdviceService } from 'src/app/shared/doctor-advice.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  page: number = 1;
  route: any;

  //emits

  constructor(
    public testService: DoctorAdviceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    public app:AppComponent,
    private auth:AuthService
  ) {
    }

  ngOnInit(): void {
    this.testService. getTest();
    this.testService.getSelectedTest();
    //this.medicineService = this.route.snapshot.params['MedicineId'];

  }

  checkoutForm = this.formBuilder.group({
   MedicineName: null,

  });

   onSubmit(): void {

    // Process checkout data here

    if (
      this.checkoutForm.value.TestId== null
    ) {

     // this.testService.generateTest(this.checkoutForm.value);
      console.log(this.checkoutForm.value);
      this.toastr.success('Test Added', 'Successfull!');
      //this.medicineService.pat.MedicineId = this.checkoutForm.value.PatientId;
      this.insertPatientMedicineRecord();


      //this.router.navigate(['/doctors/app']);
    }
    else {
      this.toastr.error('Please select a Test', 'Error!');
      this.checkoutForm.reset();
    }
  }

  insertPatientMedicineRecord() {
    console.log("Inserting a record....");
    console.log(this.checkoutForm.value)
    this.testService.insertMedicine(this.checkoutForm.value).subscribe(res => {
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

}

