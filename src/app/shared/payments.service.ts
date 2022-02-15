import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.httpClient.get(environment.apiUrl + 'receptionist/payments').toPromise().then(response=>
    {
      console.log('from service');
      console.log(response);
      this.payments= response as Payment[];

    });
  }
}
