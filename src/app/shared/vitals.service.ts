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
  //Insert Vitals
 insertPatient(vitals: Vitals): Observable<any> {
  return this.httpClient.post(
    environment.apiUrl  + 'Receptionist/addpatient',vitals);
}
postVitals(vitals:Vitals){
  return this.httpClient.post(environment.apiUrl + 'doctor/advice/vitals', vitals)
  .toPromise()
  .then((data) => {
    console.log(data);

    console.log('Tests added Successfully');
   });

 }


}
