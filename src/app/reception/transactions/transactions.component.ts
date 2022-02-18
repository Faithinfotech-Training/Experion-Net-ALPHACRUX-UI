import { Component, OnInit } from '@angular/core';
import {PaymentsService} from'src/app/shared/payments.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  filter:string;
  page:number;

  constructor(public paymentsService:PaymentsService) { }


  ngOnInit(): void {
    this.paymentsService.bindListPayments();

  }


  }




