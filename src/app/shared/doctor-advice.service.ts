import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdatePatient } from './update-patient';

@Injectable({
  providedIn: 'root'
})
export class DoctorAdviceService {
  updatePatient:UpdatePatient[];
  formData:UpdatePatient=new UpdatePatient();


  constructor(private httpClient:HttpClient) { }

     //Get patient by id
     getPatientById(id: number): Observable<any> {
       return this.httpClient.get(environment.updateUrl + 'Receptionist/patientid?id=' + id);
     }

   }


