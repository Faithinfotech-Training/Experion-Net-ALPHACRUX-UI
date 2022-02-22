import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import {PaymentsService} from'src/app/shared/payments.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  filter:string;
  page:number;

  constructor(public paymentsService:PaymentsService,
    private auth:AuthService,
     public router:Router) { }


  ngOnInit(): void {
    this.paymentsService.bindListPayments();

  }
  logout(){
    console.log('inside logout')
    this.auth.logOut();

    this.router.navigateByUrl('/login')
  }


  }




