import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReceptionService } from 'src/app/shared/reception.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  page: number = 1;

  constructor(
    public reception: ReceptionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
    this.checkoutForm.patchValue({
      TokenNum: this.reception.token.TokenNumber + 1,
    });
    if (
      this.checkoutForm.value.PatientId != null &&
      this.checkoutForm.value.StaffId != null
    ) {
      this.toastr.success('Token successfully generated');
      this.reception.generateToken(this.checkoutForm.value);
    }
    this.checkoutForm.reset();
    this.toastr.error('Cannot insert empty values');
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
