import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { Labtest } from 'src/app/shared/labtest';
import { LabtestService } from 'src/app/shared/labtest.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-lab-test-report',
  templateUrl: './lab-test-report.component.html',
  styleUrls: ['./lab-test-report.component.scss'],
})
export class LabTestReportComponent implements OnInit {
  //variables
  page: number = 1;

  newDate: Date;
  report: {} = { ReportDate: '', PatientId: '', StaffId: '' };
  reportData: {} = { PatientValue: '', ReportId: '', TestId: '' };
  testlist:{}={TestListId:'',TestName:'',AdviceId:'',TestId:'',Isactive:''}


  reportId: any;
  id: number;
  length: number;
  adviceId: number;
  testListId:number;
  testId:number;

  constructor(
    public labTestService: LabtestService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public app: AppComponent,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  //to call function to create a test report Id

  testReport(form: NgForm) {
    if (this.reportId > 0) {
      this.router.navigateByUrl('/lab/home/report/' + this.reportId);
    } else {
      this.toastr.warning('Enter patient value');
    }
  }
  //function to generate pdf

  @ViewChild('report', { static: false }) el1: ElementRef;

  generatePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');

    pdf.html(this.el1.nativeElement, {
      callback: (pdf) => {
        pdf.save('Lab-Report.pdf');
      },
    });
  }
  //to get observed values of patient from table

  save(form: NgForm, testId: number,patientValue:number,testListId:number,testName:string,
    AdviceId:number,event:any) {


      this.testlist={TestListId:testListId,TestName:testName,
        AdviceId:AdviceId,TestId:testId,Isactive:0}
        console.log('inside save'+this.testlist)



    console.log('by' + patientValue);
    if(patientValue>0){
      this.reportData = {
        PatientValue: patientValue,
        ReportId: this.reportId,
        testId: testId,
      };
      console.log(this.reportData);
      this.InsertValues(this.reportData);
      //this.postInActive(this.testlist)

        event.target.disabled = true;
        }
    else if(patientValue<0){
      this.toastr.error('Cannot insert negative values')
    }
    else if(patientValue==0){
      this.toastr.error('Cannot insert zero')
    }
    else{
      this.toastr.warning('Insert patient value')
    }

  }
  //to call the function to get patient details
  onSubmit(form: NgForm, patientId: number) {
    console.log(patientId);
    if (patientId <= 0) {
      this.toastr.error('Invalid Patient Id');
      this.resetForm(form);
    } else if (patientId > 0 || patientId != null) {
      this.getPatientById(patientId);
    }
  }
  //to call the function to get test details
  onClick(testList: Number, form: NgForm, event: any) {
    console.log(testList);

    if (testList != 0 || testList != null) {
      this.getTest(testList);
    } else {
      console.log('Enter valid Patient Id');
    }

    console.log('staffid' + form.value.StaffId);
    this.newDate = new Date();
    var datePipe = new DatePipe('en-UK');
    let formattedDate: any = datePipe.transform(this.newDate, 'yyyy-MM-dd');
    this.report = {
      ReportDate: formattedDate,
      PatientId: form.value.PatientId,
      StaffId: form.value.StaffId,
    };

    console.log(this.report);
    this.createTestReport(this.report);
    if (form.value.PatientId > 0) {
      event.target.disabled = true;
    } else {
      this.toastr.warning('Patient Id is not selected');
    }
  }
  //function to get details of patient
  getPatientById(patientId: number) {
    console.log('Finding the patient..');
    console.log(patientId);
    this.labTestService.getPatientById(Number(patientId)).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Patient details found');

        var datePipe = new DatePipe('en-UK');
        let formattedDate: any = datePipe.transform(
          res.ReportDateTime,
          'yyyy-MM-dd'
        );
        res.ReportDateTime = formattedDate;

        this.labTestService.formData = Object.assign({}, res);

        this.labTestService.getAdviceId(patientId).subscribe(
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

          }
        );
      },
      (err) => {
        console.log(err);
        this.toastr.error('Patient not found');
      }
    );
  }
  //function to get tests prescribed by doctor
  getTest(testList: Number) {
    console.log('Finding the tests..');
    this.labTestService.getTestForReport(
      this.labTestService.formData2.AdviceId
    );
  }

  //function to logout from lab technician page
  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }

  //function to reset page aftere submitting
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
  //function to create test report id
  createTestReport(obj: any) {
    console.log('Trying to insert values..');

    this.labTestService.createTestReport(obj).subscribe(
      (result1) => {
        console.log('generated id :' + result1);
        this.func(result1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  InsertValues(obj: any) {
    console.log('Trying to insert values..');

    this.labTestService.InsertPatientValues(obj).subscribe(
      (result1) => {
        console.log('inserted values : ' + result1);
        this.toastr.success('Patient Value inserted');


      },
      (error) => {
        console.log(error);
        this.toastr.error('Patient Value is not inserted');
      }
    );
  }

  func(obj: any) {
    this.reportId = Number(JSON.stringify(obj));
    console.log(' Report id created successfully' + this.reportId);
  }
  reset(form) {
    window.location.reload();
  }
  postInActive(testlist:any){
console.log('inside postInactive'+testlist)
this.labTestService.postInactive(testlist)
  }
}
