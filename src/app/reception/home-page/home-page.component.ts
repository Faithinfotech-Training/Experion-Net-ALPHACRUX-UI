import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { ReceptionService } from 'src/app/shared/reception.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  myControl = new FormControl();
  page: number = 1;
  patient: any;
  doctor: any;
  age: number = 0;
  TokenNum:number = 5;

  checkoutForm = this.formBuilder.group({
    PatientId: null,
    StaffId: null,
    TokenNum: this.TokenNum
  });

  constructor(
    public reception: ReceptionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reception.getTokenQueue();
    this.reception.getPatients();
    this.reception.getDoctors();
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
  }
}
