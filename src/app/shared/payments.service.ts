import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {Payment} from './payment';


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  payments: Payment[];
  formData:Payment=new Payment();
  constructor(private httpClient: HttpClient) { }

  bindListPayments()
  {
    return this.httpClient.get(environment.apiUrl + 'receptionist/reception/bills').toPromise().then(response=>
    {
      console.log('from service');
      console.log(response);
      this.payments= response as Payment[];

    });
  }

  savebill(payments:Payment):Observable<any>
  {
    console.log('from service',payments);
    return this.httpClient
      .post(environment.apiUrl + 'receptionist/bill', payments)
      ;
  }
/*
  insertPayment(payment:Payment): Observable<any>{
    return this.httpClient.post(
      environment.apiUrl+'receptionist/bill',
      payment

    )
  }
  */
}
