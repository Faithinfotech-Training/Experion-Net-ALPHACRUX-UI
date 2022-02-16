import { Token } from '@angular/compiler';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientListServiceService } from 'src/app/shared/patient-list-service.service';
import { ReceptionService } from 'src/app/shared/reception.service';
import {Patients} from 'src/app/shared/patients';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  page: number = 1;

  //emits




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
    if (this.checkoutForm.value.PatientId != null && this.checkoutForm.value.StaffId != null)
     {
    console.log('Done..........');
    this.reception.generateToken(this.checkoutForm.value);
    this.reception.pat.PatientId= this.checkoutForm.value.PatientId;
    this.reception.$isPass.emit(this.reception.pat);
    }

    this.checkoutForm.reset();
    this.router.navigate(['/reception/payments']);

  }


//Delete token
  deleteToken(tokenId: number) {
    if (confirm('Are you sure you want to DELETE this token?')) {
      this.reception.deleteToken(tokenId).subscribe(
        (response) => {
          this.reception.getTokenQueue();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
