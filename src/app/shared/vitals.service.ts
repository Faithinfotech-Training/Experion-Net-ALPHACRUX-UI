import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vitals } from './vitals';

@Injectable({
  providedIn: 'root'
})
export class VitalsService {
  vitals:Vitals[]

  constructor(private httpClient:HttpClient) { }
  //Insert Employee
 insertPatient(vitals: Vitals): Observable<any> {
  return this.httpClient.post(
    environment.apiUrl  + 'Receptionist/addpatient',vitals);
}

}
