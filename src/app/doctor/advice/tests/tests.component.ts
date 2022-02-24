import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { TestService} from 'src/app/shared/test.service';

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
    public testService: TestService,
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

  }

  checkoutForm = this.formBuilder.group({
   TestName: null,

  });

   onSubmit(): void {

    // Process checkout data here

    if (
      this.checkoutForm.value.TestName!= null
    ) {

      this.testService.generateTest(this.checkoutForm.value);
      console.log('tes val'+this.checkoutForm.value);
      this.toastr.success('Test Added', 'Successfull!');
      this.insertPatientTestRecord();


      //this.router.navigate(['/doctors/app']);
    }
    else {
      this.toastr.error('Please select a Test', 'Error!');
      this.checkoutForm.reset();
    }
  }

  insertPatientTestRecord() {
    console.log("Inserting a record....");
    console.log(this.checkoutForm.value)
    this.testService.insertTest(this.checkoutForm.value).subscribe(res => {
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
