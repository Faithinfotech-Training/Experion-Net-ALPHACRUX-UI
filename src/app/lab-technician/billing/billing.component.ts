import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Labbills } from 'src/app/shared/labbills';
import { Labtest } from 'src/app/shared/labtest';
import { LabtestService } from '../../shared/labtest.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  patientId: number;
  NgForm = NgForm;
  page: number = 1;
  labtest: any = new Labtest();
  total=0;
  value;
  lab:any;


  //values
  LabBillDateTime:any;
  LabBillAmount:any;
  TestListId:any;
  PatientId:any;

  constructor(
    public labTestService: LabtestService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public app: AppComponent
  ) {}

  ngOnInit(): void {}

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

  onClickClick(form: NgForm){

    this.LabBillDateTime=new Date();
    var datePipe = new DatePipe('en-UK');
    let formattedDate: any = datePipe.transform(
      this.LabBillDateTime,
      'yyyy-MM-dd'
    );
    this.TestListId=document.getElementById('TestListId');
    this.PatientId=document.getElementById('PatientId');
    this.LabBillAmount=document.getElementById('total');

    this.lab={LabBillDateTime:formattedDate,TestListId: this.TestListId,
      PatientId:this.PatientId,LabBillAmount:this.LabBillAmount}
this.post(this.lab);
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
      //this.findsum(this.users);

  }
  post(lab){


    console.log('Trying to insert values..');
    this.labTestService.postBills(lab);
  }

}
