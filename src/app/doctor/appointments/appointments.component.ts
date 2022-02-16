import { Component, OnInit } from '@angular/core';
import { ReceptionService } from 'src/app/shared/reception.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  page: number = 1;

  constructor(public reception: ReceptionService) {}

  ngOnInit(): void {
    this.reception.getTokenQueue();
  }
}
