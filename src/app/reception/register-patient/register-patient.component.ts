import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import {AddpatientService } from 'src/app/shared/addpatient.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {
  page: number=1;

  constructor(public addpatientService:AddpatientService, public app:AppComponent) { }


  ngOnInit(): void {
  
  }

}
