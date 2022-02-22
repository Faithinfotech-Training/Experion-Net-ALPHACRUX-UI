import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ReceptionService } from 'src/app/shared/reception.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  page: number = 1;

  constructor(public reception: ReceptionService,
    private router: Router,
    private auth:AuthService) {}

  ngOnInit(): void {
    this.reception.getTokenQueue();
  }

  logout(){
    console.log('inside logout')
    this.auth.logOut();

    this.router.navigateByUrl('/login')
  }
}
