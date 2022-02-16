import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PatientList } from './patient-list';

@Injectable({
  providedIn: 'root'
})
export class PatientListServiceService {

  patientList:PatientList[];
  formData:PatientList=new PatientList();
  constructor(private httpClient: HttpClient) { }

  bindListPatientList()
  {
    return this.httpClient.get(environment.apiUrl + 'doctors/patient/getpatient').toPromise().then(response=>
    {
      console.log('from service');
      console.log(response);
      this.patientList= response as PatientList[];

    });
  }
}
