import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Labtest } from './labtest';
import { Labtests2 } from './labtests2';
import { Labbills } from './labbills';
import { Testreport } from './testreport';

@Injectable({
  providedIn: 'root'
})
export class LabtestService {
  labtest:Labtest[];
  formData:Labtest=new Labtest();
  labtests2:Labtests2[];
  formData1:Labtests2=new Labtests2();
  //formData1:Labtests2=new Labtests2();
  //formData1: any = Labtest;
  users:any
  public total=0;
  public value;
  labbills:Labbills[];
  testReport:Testreport[];


  constructor(private httpClient:HttpClient) { }

  //Get patient by id
  getPatientById(id: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'labtechnician/getpatient?id=' + id);
  }

  getTests(id:number){
     this.httpClient.get(environment.apiUrl+'labtechnician/GetTestDetails?id='+id)
    .toPromise().then(
      res=>{
        console.log("from service");
        console.log(res);
        this.labtests2=res as Labtests2[];
        this.users=this.labtests2
     this.findsum(this.users);



      }
    )
  }
  getTestForReport(id:number){
    this.httpClient.get(environment.apiUrl+'labtechnician/GetTestDetails?id='+id)
   .toPromise().then(
     res=>{
       console.log("from service");
       console.log(res);
       this.labtests2=res as Labtests2[];
       this.users=this.labtests2

     }
   )
   
 }
  findsum(data){

    this.value=data
    console.log(this.value);
    for(let j=0;j<data.length;j++){
         this.total+= this.value[j].TestAmount
         console.log(this.total)
         document.getElementById('total').innerHTML=String(this.total)
         //return this.total;


    }
  }


  postBills(lab:Labtest): Observable<any>{
    console.log('inside service'+lab)
    return this.httpClient.post(
     environment.apiUrl + 'labtechnician/add',lab

    );



}
createTestReport(test:Testreport){
  console.log('inside service'+test)
  this.httpClient.post(
   environment.apiUrl + 'labtechnician/reportid',test).subscribe((result1) => {
    console.log(result1);

  },(error) =>   {
    console.log(error);
   });

}
}
