import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceptionService } from 'src/app/shared/reception.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  myControl = new FormControl();
  page: number = 1;
  patient: any;
  doctor: any;
  age: number = 0;


  constructor(
    public reception: ReceptionService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    }

  ngOnInit(): void {
    this.reception.getTokenQueue();
    this.reception.getPatients();
    this.reception.getDoctors();
  }

  checkoutForm = this.formBuilder.group({
    PatientId: null,
    StaffId: null,
    TokenNum: null,
  });

  onSubmit(): void {
    // Process checkout data here
    this.checkoutForm.patchValue({ TokenNum : this.reception.token.TokenNumber + 1 });
    console.warn('Your form has been submitted', this.checkoutForm.value);
    if (this.checkoutForm.value.PatientId != null && this.checkoutForm.value.StaffId != null) {
    console.log('Done..........');
    this.reception.generateToken(this.checkoutForm.value);
    }
    this.checkoutForm.reset();
    this.router.navigate(['/reception/payments']);
  }

}
