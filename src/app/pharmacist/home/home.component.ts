import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Pharmacist } from 'src/app/shared/pharmacist';
import { PharmacistService } from '../../shared/pharmacist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  patientId: number;
  NgForm = NgForm;
  page: number = 1;
  Pharmacist: any = new Pharmacist();
  total=0;
  value;
  lab:any;


  //values
  PrescriptionDateTime:any;
  MedBillAmount:any;
  MedListId:any;
  PatientId:any;

  
  constructor(
    public pharmacyService: PharmacistService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public app:AppComponent) { }


  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    let PatientId = this.pharmacyService.formData1.PatientId;
    //INSERT / UPDATE

    if (PatientId != 0 || PatientId != null) {

      this.getPatientById(form);
    }
    else{
      console.log('Enter valid Patient Id')
    }
  }

  onClick(form: NgForm) {
    console.log(form.value);
    let PrescriptionId = this.pharmacyService.formData1.PrescriptionId;
    console.log(PrescriptionId);
    if (PrescriptionId != 0 || PrescriptionId != null) {
      this.getTest(form);
    } else { 

      console.log('Enter valid Patient Id')
    }
  }


  //get patient

  onClickClick(form: NgForm){
    this.PrescriptionDateTime=new Date();
    var datePipe = new DatePipe('en-UK');
    let formattedDate: any = datePipe.transform(
      this.PrescriptionDateTime,
      'yyyy-MM-dd'
    );
    this.MedListId=document.getElementById('TestListId');
    this.PatientId=document.getElementById('PatientId');
    this.MedBillAmount=document.getElementById('total');

    this.lab={LabBillDateTime:formattedDate,MedListId: this.MedListId,
      PatientId:this.PatientId,MedBillAmount:this.MedBillAmount}
this.post(this.lab);
  }
  getPatientById(form?: NgForm) {
    console.log('Finding the patient..');
    this.pharmacyService
      .getPatientById(this.pharmacyService.formData1.PatientId)
      .subscribe(
        (res) => {
          console.log(res);

          //Format date
          var datePipe = new DatePipe('en-UK');
          let formattedDate: any = datePipe.transform(
            res.PrescriptionDateTime,
            'yyyy-MM-dd'
          );
          res.PrescriptionDateTime = formattedDate;
          //Assign this response to updatePatientservice formData
          this.pharmacyService.formData1 = Object.assign({}, res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getTest(form?: NgForm) {

    console.log('Finding the tests..');
    console.log(this.pharmacyService.formData1.PrescriptionId)
    this.pharmacyService
      .getTests(this.pharmacyService.formData1.PrescriptionId)
    }
    post(med){
      console.log('Trying to insert values..');
      this.pharmacyService.postBills(med);
    }
  }