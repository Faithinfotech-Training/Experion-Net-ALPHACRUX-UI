import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { VitalsService } from 'src/app/shared/vitals.service';

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent implements OnInit {
  myControl = new FormControl();
  page: number = 1;
  adviceId:Number;
  checkoutForm: any;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public doctorAdvice:VitalsService) { }

    testData ={
      PatientId:12,
      StaffId:1
    }

  ngOnInit(): void {
      this.doctorAdvice.postVitals
  }
  onSubmit():void{

    this.doctorAdvice.postVitals(this.checkoutForm.value);


    this.checkoutForm.reset();
    this.router.navigate(['/']);
  }
}
