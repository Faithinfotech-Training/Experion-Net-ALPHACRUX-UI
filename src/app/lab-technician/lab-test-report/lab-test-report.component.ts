import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
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
 newDate:Date;
 value:any[];
report: {} = { ReportDate: "", PatientId: "" ,StaffId:""}


  constructor(
    public labTestService: LabtestService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public app:AppComponent,
    private auth:AuthService) { }

  ngOnInit(): void {

  }
on(form:NgForm){
  //this.resetForm(form);
}
testReport(form:NgForm){

console.log('staffid'+form.value.StaffId)
this.newDate=new Date();
    var datePipe = new DatePipe('en-UK');
    let formattedDate: any = datePipe.transform(
      this.newDate,
      "yyyy-MM-dd"
    );


this.report={ReportDate:formattedDate,PatientId:form.value.PatientId,
  StaffId:form.value.StaffId}

  console.log(this.report);
  this.createTestReport(this.report);



}


save(form:NgForm){
 var patientValue=Number(document.getElementById('PatientValue').innerText)
console.log('by getelement'+patientValue);
//console.log('form'+this.labTestService.testReport.PatientValue)

}


  onSubmit(patientId: number) {
    console.log(patientId);
    if(patientId<=0){
      this.toastr.error('Invalid Patient Id', 'CMS App V2022');
      //this.resetForm();
    }


    else if (patientId != 0 || patientId != null) {

      this.getPatientById(patientId);


    }
    else {
      console.log('Enter valid Patient Id');

    }
  }

  onClick(testList: Number) {
    console.log(testList);
   // let AdviceId = this.labTestService.formData.AdviceId;
    if (testList != 0 || testList != null) {
      //Insert
      this.getTest(testList);
    } else {
      console.log('Enter valid Patient Id');
    }
  }


  getPatientById(patientId:number) {
    console.log('Finding the patient..');
    console.log(patientId);
    this.labTestService
      .getPatientById(Number(patientId))
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Patient details found successfully', 'CMS App V2022');

          //Format date
          var datePipe = new DatePipe('en-UK');
          let formattedDate: any = datePipe.transform(
            res.ReportDateTime,
            'yyyy-MM-dd'
          );
          res.ReportDateTime = formattedDate;
          //Assign this response to updatePatientservice formData
          this.labTestService.formData = Object.assign({}, res);
          //this.toastr.success('Patient details found successfully', 'CMS App V2022');
        },
        (err) => {
          console.log(err);
          this.toastr.error('Patient not found', 'CMS App V2022');
          //this.resetForm(form);
        }
      );
  }

  getTest(testList: Number) {
    console.log('Finding the tests..');
    this.labTestService
      . getTestForReport(this.labTestService.formData.AdviceId)
  }
  logout(){
    console.log('inside logout')
    this.auth.logOut();

    this.router.navigateByUrl('/login')
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

  createTestReport(obj:any){
    console.log('Trying to insert values..');

    this.labTestService.createTestReport(obj)
    console.log('Report id created successfully');

  }
}
