import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vitals } from './vitals';

@Injectable({
  providedIn: 'root'
})
export class VitalsService {
  insertvitals:Vitals[];
  formData:Vitals=new Vitals();

  constructor(private httpClient:HttpClient) { }
  //Insert Vitals
 insertVitals(insertvitals: Vitals): Observable<any> {
  return this.httpClient.post(
    environment.apiUrl  + 'doctor/advice/vitals',insertvitals);
}


}
