import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdatePatient } from './update-patient';
import { TestLists } from './test-lists';
import { Testadvice } from './testadvice';
import { Addtest } from './addtest';
import { Patients } from './patients';

@Injectable({
  providedIn: 'root'
})
export class DoctorAdviceService {
  updatePatient:UpdatePatient[];
  testLists:TestLists[];
  testAdvice:Testadvice[];
  listid:string;
  patients: Patients[];

  tests: TestLists[];
  testList: TestLists[];
  insertTest: TestLists[];


  formData:UpdatePatient=new UpdatePatient();
  $isPass= new EventEmitter();
  pat:TestLists=
  {
    TestId:0,
  TestName:'',
  };


  constructor(private httpClient:HttpClient) { }

     //Get patient by id
     getPatientById(id: number): Observable<any> {
       return this.httpClient.get(environment.apiUrl + 'Receptionist/patientid?id=' + id);
     }

     getTestLists(){
      return this.httpClient.get(environment.updateUrl + 'doctor/viewlists').
      toPromise()
      .then(response=>
        {
          console.log('from service');
          console.log(response);
          this.testLists= response as TestLists[];

        });
     }

     createTestListId(testAdvice:Testadvice){
       console.log('not returning')
       return this.httpClient.post(environment.updateUrl + 'doctor/CreateTestListId', testAdvice)
      .toPromise()
      .then((data) => {
        console.log(data);
        console.log('Test advice Id generated Successfully');
       });
     }

     postTests(addTest:Addtest){
       console.log("add test error");
      return this.httpClient.post(environment.updateUrl + 'doctor/AddTest', addTest)
      .toPromise()
      .then((data) => {
        console.log(data);

        console.log('Tests added Successfully');
       });

     }
//Get Test
getTest() {
  return this.httpClient
    .get(environment.updateUrl + 'doctors/viewlists')
    .toPromise()
    .then((data) => {
      console.log(data);
      this.tests = data as TestLists[];
    });
}

//Generate Test
generateTest(tests: TestLists) {
return this.httpClient
  .post(environment.apiUrl + 'doctors/medicine', tests)
  .toPromise()
  .then((data) => {
    console.log(data);
    console.log('Test added sucessfully');
  });
}
//InsertTest
insertMedicine(insertTest: TestLists): Observable<any> {
return this.httpClient.post(
  environment.updateUrl  + 'doctors/AddMedicine',insertTest);
}

 //Get Selected medicine
 getSelectedTest() {
  return this.httpClient
    .get(environment.updateUrl + 'doctors/Getmedicine')
    .toPromise()
    .then((data) => {
      console.log(data);
      this.testList = data as TestLists[];
    });
}
   }


