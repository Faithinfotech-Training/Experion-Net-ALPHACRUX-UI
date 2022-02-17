import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { LabtestService } from '../../shared/labtest.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  patientId:number;
  NgForm=NgForm;
  page:number=1;

  constructor(
    public labTestService: LabtestService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public app:AppComponent) { }

  ngOnInit(): void {

  }


  onSubmit(form: NgForm) {
    console.log(form.value);
    let PatientId = this.labTestService.formData.PatientId;


    //Insert or update
    if (PatientId != 0 || PatientId != null) {

      //Insert
      this.getPatientById(form);


    } else {

      console.log('Enter valid Patient Id')


    }





  }


  onClick(form1: NgForm) {
    console.log(form1.value);
    let AdviceId = this.labTestService.formData.AdviceId;
    if (AdviceId != 0 || AdviceId != null) {

      //Insert
      this.getTest(form1);


    } else {

      console.log('Enter valid Patient Id')


    }


  }


  getPatientById(form?: NgForm) {
    console.log("Finding the patient..");
    this.labTestService.getPatientById(this.labTestService.formData.PatientId).subscribe(res => {
      console.log(res);



      //Format date
      var datePipe = new DatePipe("en-UK");
      let formattedDate:any =datePipe.transform(res.ReportDateTime, 'yyyy-MM-dd');
      res.ReportDateTime = formattedDate;
       //Assign this response to updatePatientservice formData
      this.labTestService.formData = Object.assign({}, res);


    },
      err => {
        console.log(err);
      }
    );

  }

  getTest(form?: NgForm) {
    console.log("Finding the tests..");
    this.labTestService.getTests(this.labTestService.formData.AdviceId)
    .subscribe(res => {

      console.log(res);
      console.log('INSIDE gettest')

      //this.labTestService. formData1 = Object.assign({}, res);

    },
      err => {
        console.log(err);
      }
    );

  }


}
