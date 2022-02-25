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
    console.log('staffid' + form.value.StaffId);
    //curret date
    this.newDate = new Date();
    var datePipe = new DatePipe('en-UK');
    //formats date
    let formattedDate: any = datePipe.transform(this.newDate, 'yyyy-MM-dd');
    //formats to json
    this.report = {
      ReportDate: formattedDate,
      PatientId: form.value.PatientId,
      StaffId: form.value.StaffId,
    };

    console.log(this.report);
    this.createTestReport(this.report);
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

  save(form: NgForm) {
    var patientValue = Number(
      document.getElementById('PatientValue').innerText
    );
    console.log('by getelement' + patientValue);
  }
  //to call the function to get patient details
  onSubmit(patientId: number) {
    console.log(patientId);
    if (patientId <= 0) {
      this.toastr.error('Invalid Patient Id', 'CMS App V2022');
    } else if (patientId != 0 || patientId != null) {
      this.getPatientById(patientId);
    } else {
      console.log('Enter valid Patient Id');
    }
  }
  //to call the function to get test details
  onClick(testList: Number) {
    console.log(testList);

    if (testList != 0 || testList != null) {
      this.getTest(testList);
    } else {
      console.log('Enter valid Patient Id');
    }
  }
  //function to get details of patient
  getPatientById(patientId: number) {
    console.log('Finding the patient..');
    console.log(patientId);
    this.labTestService.getPatientById(Number(patientId)).subscribe(
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
      }
    );
  }
  //function to get tests prescribed by doctor
  getTest(testList: Number) {
    console.log('Finding the tests..');
    this.labTestService.getTestForReport(this.labTestService.formData.AdviceId);
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

    this.labTestService.createTestReport(obj);
    console.log('Report id created successfully');
  }
}
