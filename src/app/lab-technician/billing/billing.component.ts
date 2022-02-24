import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
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
  //lab:any;
  clicked = false;
 lab: {} = { LabBillDateTime: "", TestListId: "" ,PatientId:"", LabBillAmount:""}



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
    public app: AppComponent,
    private auth:AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    let PatientId = this.labTestService.formData.PatientId;
    if(PatientId<=0){
      this.toastr.error('Invalid Patient Id', 'CMS App V2022');
      this.resetForm(form);
    }


    else if (PatientId != 0 || PatientId != null) {

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
    //console.log('Value of id'+form.value.PatientId)
    this.LabBillDateTime=new Date();
    var datePipe = new DatePipe('en-UK');
    let formattedDate: any = datePipe.transform(
      this.LabBillDateTime,
      "yyyy-MM-dd"
    );
    console.log(form.form.value.StaffName)
     //this.TestListId=document.getElementById('TestListId').innerText;
    // this.PatientId=form.value.PatientId
     this.LabBillAmount=document.getElementById('total').innerHTML;
     this.TestListId=form.value.TestListId

    console.log('Value of id'+this.TestListId)
    var numberValue = Number(this.LabBillAmount);




    this.lab={LabBillDateTime:formattedDate,TestListId: this.TestListId,
      PatientId:form.value.PatientId,LabBillAmount:numberValue}

      console.log(form.value.TestListId)


      if(form.value.PatientId>0 && numberValue>0){
        this.post(this.lab);
      }
      else{
        this.toastr.error('Cannot create bill with given information', 'CMS App V2022');

      }





  }





  getPatientById(form?: NgForm) {
    console.log('Finding the patient..');
    this.labTestService
      .getPatientById(this.labTestService.formData.PatientId)
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

        },
        (err) => {
          console.log(err);
          this.toastr.error('Patient not found', 'CMS App V2022');
          this.resetForm(form);
        }
      );
  }

  getTest(form?: NgForm) {
    console.log('Finding the tests..');
    this.labTestService
      .getTests(this.labTestService.formData.AdviceId)
      //this.findsum(this.users);

  }
  post(obj:any){


    console.log('Trying to insert values..');

    this.labTestService.postBills(obj).subscribe((result1) => {
      console.log(result1);

    this.toastr.success('Billing record Inserted Successfully', 'CMS App V2022');
    // this.router.navigateByUrl('lab/home/test')
    },(error) =>   {console.log(error);



  });

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



}
