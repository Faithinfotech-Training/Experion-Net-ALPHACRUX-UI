import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import {PatientListServiceService} from 'src/app/shared/patient-list-service.service'

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  filter:string;
  page:number;
  public birthdate: Date;
  public age: number;
  constructor(public patientListService:PatientListServiceService,
    private auth:AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.patientListService.bindListPatientList();

  }
  logout(){
    this.auth.logOut;
    this.router.navigateByUrl('/login')
  }


}
