import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Labtest } from './labtest';
import { Labtests2 } from './labtests2';
import { Labbills } from './labbills';
import { Testreport } from './testreport';
import{AllTestReports} from './all-test-reports'
import { Patients } from './patients';

@Injectable({
  providedIn: 'root',
})
export class LabtestService {
  //variables
  formData: Labtest = new Labtest();
  labtests2: Labtests2[];
  formData2:Labtests2=new Labtests2();
  users: any;
  public total = 0;
  public value;
  testReport:Testreport=new Testreport();
  individualReport:AllTestReports=new AllTestReports()
  allTestReports:AllTestReports[];
  $isPass = new EventEmitter();

  pat: Patients = {

    PatientId: 0,

    PatientName: '',

  };


  constructor(private httpClient: HttpClient) {}

  //Get patient by id
  getPatientById(id: number): Observable<any> {
    return this.httpClient.get(
      environment.apiUrl + 'labtechnician/getpatient?id=' + id
    );
  }
  //get tests by list id
  getTests(id: number) {
    this.httpClient
      .get(environment.apiUrl + 'labtechnician/TestDetails?id=' + id)
      .toPromise()
      .then((res) => {
        console.log('from service');
        console.log(res);
        this.labtests2 = res as Labtests2[];
        this.users = this.labtests2;
        this.findsum(this.users);
      });
  }
  //get test details
  getTestForReport(id: number) {
    this.httpClient
      .get(environment.apiUrl + 'labtechnician/TestDetails?id=' + id)
      .toPromise()
      .then((res) => {
        console.log('from service');
        console.log(res);
        this.labtests2 = res as Labtests2[];
        this.users = this.labtests2;
      });
  }
  //find total amout
  findsum(data) {
    this.value = data;
    console.log(this.value);
    for (let j = 0; j < data.length; j++) {
      this.total += this.value[j].TestAmount;
      console.log(this.total);
      document.getElementById('total').innerHTML = String(this.total);
    }
  }

  //saving bill details to database
  postBills(lab: Labtest): Observable<any> {
    console.log('inside service' + lab);
    return this.httpClient.post(environment.apiUrl + 'labtechnician/add', lab);
  }
  //create report list id
  createTestReport(test: Testreport):Observable<any> {
    console.log('inside service' + test);
    return this.httpClient
      .post(environment.apiUrl + 'labtechnician/reportid', test)
  }
  InsertPatientValues(test: Testreport):Observable<any> {
    console.log('inside service' + test);
    return this.httpClient
      .post(environment.apiUrl + 'labtechnician/labreports', test)
  }


  getallTestReports() {
    this.httpClient
      .get(environment.apiUrl + 'receptionist/getallpatients')
      .toPromise()
      .then((res) => {
        console.log('from service');
        console.log(res);
        this.allTestReports= res as AllTestReports[];

        this.allTestReports.map(item => item.PatientId)
        .filter((value, index, self) => self.indexOf(value) === index)
        console.log(this.allTestReports);
        //this.users = this.allTestReports;
      });
  }
  getIndividualReport(lab:number){
    console.log(lab);
    this.httpClient
      .get(environment.apiUrl + 'labtechnician/testreports?Id='+lab)
      .toPromise()
      .then((res) => {
        console.log('from service');
        console.log(res);
        this.allTestReports= res as AllTestReports[];
        this.users = this.allTestReports;
      });
  }
  getNewReport(lab:number){
    console.log(lab);
    this.httpClient
      .get(environment.apiUrl + 'labtechnician/individualreports?Id='+lab)
      .toPromise()
      .then((res) => {
        console.log('from service');
        console.log(res);
        this.allTestReports= res as AllTestReports[];
        this.users = this.allTestReports;
      });
  }

}
