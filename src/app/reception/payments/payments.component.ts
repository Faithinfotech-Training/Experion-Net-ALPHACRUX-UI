import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { ReceptionService } from 'src/app/shared/reception.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  patientID:number;
  patientName:string;



  constructor(private receptionService : ReceptionService,private router: Router) {}

  ngOnInit(): void {

    this.receptionService.$isPass
    .subscribe( (data)=>{
      console.log(data.PatientId);
     // getpatientwithid(data.PatientId);

      console.log("I got in console",data);
      this.router.navigateByUrl('/reception/home');

    })

   /* getpatientwithid(patientId: number) {

        this.reception.getpatientwithid(patientId).subscribe(
          (response) => {
            this.reception.getpatientwithid();
          },
          (error) => {
            console.log(error);
          }
        );
      }*/

  }

}
