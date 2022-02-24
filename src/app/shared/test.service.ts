import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patients } from './patients';
import { Test } from './test';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  patients: Patients[];
  formData: Patients = new Patients();
  tests: Test[];
  testList:Test[];
  inserttest:Test[];

  $isPass= new EventEmitter();
  pat:Test=
  {
    TestId:0,
    TestName:''
  };
  $isDoc=new EventEmitter();
  doc:Test=
  {

    TestId: 0,
    TestName:''
 }
  httpClient: any;

  constructor(private client: HttpClient) {}


  //Get Test
  getTest() {
    return this.client
      .get(environment.updateUrl + 'doctors/ViewTestLists')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.tests = data as Test[];
      });
  }


  //Generate Test
  generateTest(tests: Test) {
    return this.client
      .post(environment.apiUrl + 'doctors/test', tests)
      .toPromise()
      .then((data) => {
        console.log(data);
        console.log('Test added sucessfully');
      });
  }


  //Insert Test
 insertTest(inserttest: Test): Observable<any> {
  return this.httpClient.post(
    environment.updateUrl  + 'doctors/test',inserttest);
  }

  //Get Selected Test
  getSelectedTest() {
    return this.client
      .get(environment.updateUrl + 'doctors/Gettest')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.testList = data as Test[];
      });
  }


}
