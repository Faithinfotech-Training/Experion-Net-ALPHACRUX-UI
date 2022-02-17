import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Labtest } from 'src/app/shared/labtest';
import { LabtestService } from 'src/app/shared/labtest.service';

@Component({
  selector: 'app-lab-test-report',
  templateUrl: './lab-test-report.component.html',
  styleUrls: ['./lab-test-report.component.scss']
})
export class LabTestReportComponent implements OnInit {
  patientId:number;
  NgForm=NgForm;
  page:number=1;
 labtest: any = new Labtest();

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


    if (PatientId != 0 || PatientId != null) {

      this.getPatientById(form);
    }
    else {
      console.log('Enter valid Patient Id');
    }
  }

  onClick(form: NgForm) {
    console.log(form.value);
    let AdviceId = this.labTestService.formData.AdviceId;
    if (AdviceId != 0 || AdviceId != null) {
      //Insert
      this.getTest(form);
    } else {
      console.log('Enter valid Patient Id');
    }
  }


  getPatientById(form?: NgForm) {
    console.log('Finding the patient..');
    this.labTestService
      .getPatientById(this.labTestService.formData.PatientId)
      .subscribe(
        (res) => {
          console.log(res);

          //Format date
          var datePipe = new DatePipe('en-UK');
          let formattedDate: any = datePipe.transform(
            res.ReportDateTime,
            'yyyy-MM-dd'
          );
          res.ReportDateTime = formattedDate;
          //Assign this response to updatePatientservice formData
          this.labTestService.formData = Object.assign({}, res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getTest(form?: NgForm) {
    console.log('Finding the tests..');
    this.labTestService
      .getTests(this.labTestService.formData.AdviceId)
      // .subscribe(
      //   (res) => {
      //     console.log(res);

      //     this.labTestService.formData1 = Object.assign({}, res);
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
  }
}
