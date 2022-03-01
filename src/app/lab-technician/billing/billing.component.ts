import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { Labbills } from 'src/app/shared/labbills';
import { Labtest } from 'src/app/shared/labtest';
import { LabtestService } from '../../shared/labtest.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  //Variables

  page: number = 1;
  total = 0;
  lab: {} = {
    LabBillDateTime: '',
    TestListId: '',
    PatientId: '',
    LabBillAmount: '',
  };
  LabBillDateTime: any;
  LabBillAmount: any;
  TestListId: any;

  constructor(
    public labTestService: LabtestService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public app: AppComponent,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  //calling function to get patient details

  onSubmit(form: NgForm) {
    //prints value in console
    console.log(form.value);
    let PatientId = this.labTestService.formData.PatientId;
    //patient id validation
    if (PatientId <= 0) {
      //invaid
      this.toastr.error('Invalid Patient Id', 'CMS App V2022');
      this.resetForm(form);
    } else if (PatientId != 0 || PatientId != null) {
      //valid
      this.getPatientById(form);
    }
  }

  //calling function to get test details

  onClick(form: NgForm) {
    //printing value in console
    console.log(form.value);
    let AdviceId = this.labTestService.formData.AdviceId;
    //adviceid validation
    if (AdviceId != 0 || AdviceId != null) {
      //Valid
      this.getTest(form);
    } else {
      //invalid
      console.log('Enter valid Patient Id');
    }
  }
  //to call function to insert billing details to database
  onClickClick(form: NgForm) {
    //date at the time of insertion
    this.LabBillDateTime = new Date();
    var datePipe = new DatePipe('en-UK');
    //formattig date
    let formattedDate: any = datePipe.transform(
      this.LabBillDateTime,
      'yyyy-MM-dd'
    );
    console.log(form.form.value.StaffName);
    //getting total from html page
    this.LabBillAmount = document.getElementById('total').innerHTML;
    //getting value from form
    this.TestListId = form.value.TestListId;

    console.log('Value of id' + this.TestListId);
    var numberValue = Number(this.LabBillAmount);
    //formatting to json
    this.lab = {
      LabBillDateTime: formattedDate,
      TestListId: this.TestListId,
      PatientId: form.value.PatientId,
      LabBillAmount: numberValue,
    };

    console.log(form.value.TestListId);
    //validation
    if (form.value.PatientId > 0 && numberValue > 0) {
      this.post(this.lab);
    } else {
      this.toastr.error(
        'Cannot create bill with given information',
        'CMS App V2022'
      );
    }
  }
  //function to get details of patient
  getPatientById(form?: NgForm) {
    console.log('Finding the patient..');
    this.labTestService
      .getPatientById(this.labTestService.formData.PatientId)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success(
            'Patient details found successfully',
            'CMS App V2022'
          );

          var datePipe = new DatePipe('en-UK');
          let formattedDate: any = datePipe.transform(
            res.ReportDateTime,
            'yyyy-MM-dd'
          );
          res.ReportDateTime = formattedDate;

          this.labTestService.formData = Object.assign({}, res);
        },
        (err) => {
          console.log(err);
          this.toastr.error('Patient not found', 'CMS App V2022');
          this.resetForm(form);
        }
      );
  }
  //function to get detailsof tests prescribed by doctor
  getTest(form?: NgForm) {
    console.log('Finding the tests..');
    this.labTestService.getTests(this.labTestService.formData.AdviceId);
  }
  post(obj: any) {
    console.log('Trying to insert values..');

    this.labTestService.postBills(obj).subscribe(
      (result1) => {
        console.log(result1);

        this.toastr.success(
          'Billing record Inserted Successfully',
          'CMS App V2022'
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //function to logout from lab tecnician page
  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
  //function to reset page after inserting data
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
  //function to generate pdf
  @ViewChild('bill', { static: false }) el1: ElementRef;

  generatePDF() {
    let pdf = new jsPDF('p', 'pt', 'a3');

    pdf.html(this.el1.nativeElement, {
      callback: (pdf) => {
        pdf.save('Lab-Bill.pdf');
      },
    });
  }
}
