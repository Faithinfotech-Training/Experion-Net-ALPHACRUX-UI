import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdatePatient } from './update-patient';
import { TestLists } from './test-lists';
import { Testadvice } from './testadvice';
import { Addtest } from './addtest';

@Injectable({
  providedIn: 'root'
})
export class DoctorAdviceService {
  updatePatient:UpdatePatient[];
  testLists:TestLists[];
  testAdvice:Testadvice[];
  listid:string;


  formData:UpdatePatient=new UpdatePatient();

  constructor(private httpClient:HttpClient) { }

     //Get patient by id
     getPatientById(id: number): Observable<any> {
       return this.httpClient.get(environment.apiUrl + 'Receptionist/patientid?id=' + id);
     }

     getTestLists(){
      return this.httpClient.get(environment.updateUrl + 'doctors/viewlists').
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
       return this.httpClient.post(environment.updateUrl + 'doctors/CreateTestListId', testAdvice)
      .toPromise()
      .then((data) => {
        console.log(data);
        console.log('Test advice Id generated Successfully');
       });
     }

     postTests(addTest:Addtest){
       console.log("add test error");
      return this.httpClient.post(environment.updateUrl + 'doctors/AddTest', addTest)
      .toPromise()
      .then((data) => {
        console.log(data);

        console.log('Tests added Successfully');
       });

     }

   }


