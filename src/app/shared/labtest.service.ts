import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Labtest } from './labtest';
import { Labtests2 } from './labtests2';

@Injectable({
  providedIn: 'root'
})
export class LabtestService {
  labtest:Labtest[];
  formData:Labtest=new Labtest();
  labtests2:Labtests2[]
  //formData1:Labtests2=new Labtests2();
  formData1: any = Labtest;


  constructor(private httpClient:HttpClient) { }

  //Get patient by id
  getPatientById(id: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'labtechnician/getpatient?id=' + id);
  }

  getTests(id:number){
    return this.httpClient.get(environment.apiUrl+'labtechnician/GetTestDetails?id='+id)
  }
}
