import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Diagnosis } from './diagnosis';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {
  diagnosis:Diagnosis[];
  formData:Diagnosis=new Diagnosis();

  constructor(private httpClient:HttpClient) { }
  //Insert Employee
 insertNote(diagnosis: Diagnosis): Observable<any> {
  return this.httpClient.post(
    environment.apiUrl
      + 'doctors/patient/medicalhistory',diagnosis);
}

  //Get patient by id
  getPatientById(id: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl+ 'Receptionist/patientid?id=' + id);
  }
}
