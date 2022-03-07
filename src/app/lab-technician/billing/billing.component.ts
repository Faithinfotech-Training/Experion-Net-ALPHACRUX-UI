import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { LabtestService } from '../../shared/labtest.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  //Variables

  totalAmount: number;
  page: number = 1;
  total = 0;
  billId: number;
  lab: {} = {
    LabBillDateTime: '',
    TestListId: '',
    PatientId: '',
    LabBillAmount: '',
  };
  LabBillDateTime: any;
  LabBillAmount: any;
  TestListId: any;
  adviceId: number;
  length: number;
  patientId: number;

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
    console.log(form.value);
    let PatientId = this.labTestService.formData.PatientId;

    if (PatientId <= 0) {
      this.toastr.error('Invalid Patient Id');
      this.resetForm(form);
    } else if (PatientId != 0 || PatientId != null) {
      this.getPatientById(form);
    }
  }

  //calling function to get test details

  onClick(form: NgForm, event: any) {
    console.log(form.value);
    let advice = this.labTestService.formData2.AdviceId;
    console.log(advice);

    if (advice != 0 || advice != null) {
      this.getTest(form);
    } else {
      console.log('Enter valid Patient Id');
    }

    if (form.value.PatientId > 0) {
      event.target.disabled = true;
    }
  }

  //to call function to insert billing details
  finalSubmit(form: NgForm, testList: number, event: any) {
    this.LabBillDateTime = new Date();
    var datePipe = new DatePipe('en-UK');

    let formattedDate: any = datePipe.transform(
      this.LabBillDateTime,
      'yyyy-MM-dd'
    );

    this.LabBillAmount = document.getElementById('total').innerHTML;

    this.TestListId = testList;

    console.log('Value of id' + this.TestListId);
    var numberValue = Number(this.LabBillAmount);
    this.totalAmount = numberValue;

    this.lab = {
      LabBillDateTime: formattedDate,
      TestListId: this.TestListId,
      PatientId: form.value.PatientId,
      LabBillAmount: numberValue,
    };

    console.log(form.value.TestListId);

    if (form.value.PatientId > 0 && numberValue > 0) {
      this.post(form, this.lab);
    } else {
      this.toastr.error('Cannot create bill with given information');
    }
  }
  //function to get details of patient
  getPatientById(form?: NgForm) {
    console.log('Finding the patient..');
    this.patientId = this.labTestService.formData.PatientId;
    this.labTestService
      .getPatientById(this.labTestService.formData.PatientId)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Patient details found successfully');

          var datePipe = new DatePipe('en-UK');
          let formattedDate: any = datePipe.transform(
            res.ReportDateTime,
            'yyyy-MM-dd'
          );
          res.ReportDateTime = formattedDate;

          this.labTestService.formData = Object.assign({}, res);
          this.labTestService.getAdviceId(this.patientId).subscribe(
            (res) => {
              console.log('Advice Ids ' + res);
              let arr = [];
              Object.keys(res).map(function (key) {
                arr.push({ [key]: res[key] });
                return arr;
              });
              console.log('Object=', res);
              console.log('Array=', arr);
              this.length = arr.length;
              console.log('length of array' + this.length);
              console.log('last value' + res[this.length - 1]);
              this.labTestService.formData2 = Object.assign(
                {},
                res[this.length - 1]
              );

              this.adviceId = Number(this.labTestService.formData2.AdviceId);
              console.log('Recent Advice Id' + this.adviceId);
            },
            (err) => {
              console.log(err);
              this.toastr.error('Advice Id not found');
            }
          );
        },
        (err) => {
          console.log(err);
          this.toastr.error('Patient data not found');
          this.resetForm(form);
        }
      );
  }
  //function to get details of tests prescribed by doctor
  getTest(form?: NgForm) {
    console.log('Finding the tests..');
    this.labTestService.getTests(this.labTestService.formData2.AdviceId);
  }
  post(form: NgForm, obj: any) {
    console.log('Trying to insert values..');

    this.labTestService.postBills(obj).subscribe(
      (result1) => {
        console.log('inside post result' + result1);
        this.billId = Number(result1);

        this.toastr.success('Billing record Inserted Successfully');
        this.router.navigateByUrl(
          '/lab/home/bill/' + this.billId + '/' + this.totalAmount
        );
      },

      (error) => {
        console.log(error);
        this.toastr.success('Billing record cannot be Inserted ');
        window.location.reload();
      }
    );
  }

  reset(form) {
    window.location.reload();
  }
  //function to logout from lab tecnician page
  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
  //function to reset page
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
  //function to generate pdf
  @ViewChild('bill', { static: false }) el1: ElementRef;

  generatePDF() {
    let pdf = new jsPDF('p', 'pt', 'letter');

    pdf.html(this.el1.nativeElement, {
      callback: (pdf) => {
        pdf.save('Lab-Bill.pdf');
      },
    });
  }
}
