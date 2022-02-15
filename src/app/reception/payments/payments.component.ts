import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  patientID:number;


  constructor(route:ActivatedRoute
    ) {
      this.patientID= route.snapshot.params['id'];
      }

  ngOnInit(): void {

  }

}
