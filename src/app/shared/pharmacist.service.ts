import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LabTestReportComponent } from '../lab-technician/lab-test-report/lab-test-report.component';
import { Medlist } from './medlist';
import { Pharmacist } from './pharmacist';
import {Medbills} from '../shared/medbills'
import { QueryValueType } from '@angular/compiler/src/core';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PharmacistService {
  Pharm : Pharmacist[];
  formData1: Pharmacist=new Pharmacist();

  MedList:Medlist[];
  formData2:Medlist=new Medlist();

  users:any
  public total=0;
  public product=0;
  public value;
  medbills:Medbills[];
  constructor(private httpClient:HttpClient) { }
  clientProductForm:FormArray



  getPatientById(id: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl + 'pharmacist/prescription/' + id);
  }

  getTests(id:number){
    this.httpClient.get(environment.apiUrl+'pharmacist/getmedicinelist/'+id)
    .toPromise().then(
      res=>{
        console.log("from service");
        console.log(res);
        this.MedList=res as Medlist[];
        this.users=this.MedList

     this.findprod(this.users);
     this.findsum(this.users);



      }
    )
  }

  findprod(data){
    this.value=data;
    console.log(this.value.MedicineQuantity);

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
  postBills(med:Medbills){
    console.log(med)
    this.httpClient.post(
      environment.apiUrl +'pharmacist/add',med

    );

}

}

