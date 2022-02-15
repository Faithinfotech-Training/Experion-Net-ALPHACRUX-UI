import { Component, OnInit } from '@angular/core';
import {PatientListServiceService} from 'src/app/shared/patient-list-service.service'
import * as moment from 'moment';

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
  constructor(public patientListService:PatientListServiceService) { }

  ngOnInit(): void {
    this.patientListService.bindListPatientList();

  }


}
