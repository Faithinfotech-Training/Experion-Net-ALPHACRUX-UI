import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorAdviceService } from '../../shared/doctor-advice.service'

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss']
})
export class AdviceComponent implements OnInit {
  patientId:number;
  NgForm=NgForm;

  constructor(public doctorAdviceService: DoctorAdviceService,
    private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
  this.patientId = this.route.snapshot.params['patientId'];
  this.patientId =13
    console.log('insiide oninit')
  if (this.patientId != 0 || this.patientId != null) {

    //Get patient by id
    this.doctorAdviceService.getPatientById(this.patientId).subscribe(
        response =>{
        console.log(response);

        //Format date
        var datePipe = new DatePipe("en-UK");
        let formattedDate:any =datePipe.transform(response.PatientDob, 'yyyy-MM-dd');
        response.DateOfJoining = formattedDate;
        //Assign this response to doctorPatientservice formData
        this.doctorAdviceService.formData = Object.assign({}, response);
      },
      error => {
        console.log(error);
      }

    );
  }
}







}
