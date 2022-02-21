import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { DoctorAdviceService } from 'src/app/shared/doctor-advice.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
  myControl = new FormControl();
  page: number = 1;
  adviceId:Number;



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public doctorAdvice:DoctorAdviceService,
    private auth:AuthService) { }

    testData ={
      PatientId:13,
      StaffId:1

    }


  ngOnInit(): void {

    this.doctorAdvice.getTestLists();
    //this.doctorAdvice.createTestListId(this.testData) //uncomment
  }
  checkoutForm = this.formBuilder.group({
    TestId: null,
    TestName: null,
  });


  onSubmit():void{

    this.doctorAdvice.postTests(this.checkoutForm.value);


    this.checkoutForm.reset();
   // this.router.navigate(['/']);
  }


  logout(){
    console.log('inside logout')
    this.auth.logOut();

    this.router.navigateByUrl('/login')
  }
}
