import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdatePatient } from './update-patient';

@Injectable({
  providedIn: 'root'
})
export class UpdatePatientService {
  updatePatient:UpdatePatient[];
  formData:UpdatePatient=new UpdatePatient();


  constructor(private httpClient:HttpClient) { }
  //Update Patient Details
  UpdatePatient(updatePatient: UpdatePatient): Observable<any> {
    return this.httpClient.put(
      environment.updateUrl + 'Receptionist/updatepatient',updatePatient);
  }

 //Insert Employee
 insertPatient(updatePatient: UpdatePatient): Observable<any> {
  return this.httpClient.post(
    environment.updateUrl  + 'Receptionist/addpatient',updatePatient);
}

  //Get patient by id
  getPatientById(id: number): Observable<any> {
    return this.httpClient.get(environment.updateUrl + 'Receptionist/patientid?id=' + id);
  }

}

