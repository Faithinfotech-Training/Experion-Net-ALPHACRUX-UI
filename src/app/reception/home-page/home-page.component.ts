import { Component, OnInit } from '@angular/core';
import { ReceptionService } from 'src/app/shared/reception.service';
import { TokenQueue } from 'src/app/shared/token-queue';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  page: number = 1;
  patient: any;
  doctor: any;

  constructor(public reception: ReceptionService ) { }

  ngOnInit(): void {
    this.reception.getTokenQueue();
    this.reception.getPatients();
    
  }

}
