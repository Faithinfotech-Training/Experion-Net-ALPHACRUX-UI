import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Addpatient } from './addpatient';

@Injectable({
  providedIn: 'root'
})
export class AddpatientService {
  patient: Addpatient[]=[];

  constructor(private httpClient:HttpClient)  { }
  postPatient(patient: Addpatient){
    return this.httpClient.post(
      environment.apiUrl + 'Receptionist/addpatient',patient

    );
}
}
