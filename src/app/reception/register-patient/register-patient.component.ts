import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import {AddpatientService } from 'src/app/shared/addpatient.service';
import { UpdatePatientService } from 'src/app/shared/update-patient.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent implements OnInit {
  patientId:number;
  NgForm=NgForm;

  constructor(public updatePatientService: UpdatePatientService,
    private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.patientId = this.route.snapshot.params['patientId'];
     this.patientId =0

    if (this.patientId != 0 || this.patientId != null) {

      //Get patient by id
      this.updatePatientService.getPatientById(this.patientId).subscribe(
          response =>{
          console.log(response);

          //Format date
          var datePipe = new DatePipe("en-UK");
          let formattedDate:any =datePipe.transform(response.PatientDob, 'yyyy-MM-dd');
          response.DateOfJoining = formattedDate;
          //Assign this response to updatePatientservice formData
          this.updatePatientService.formData = Object.assign({}, response);
        },
        error => {
          console.log(error);
        }

      );
    }
  }
 //Submit form
 onSubmit(form: NgForm) {
  console.log(form.value);
  let addId = this.updatePatientService.formData.PatientId;

  //Insert or update
  if (addId == 0 || addId == null) {

    //Insert
    this.insertPatientRecord(form);
    this.resetForm(form);
    this.router.navigateByUrl('/reception/home');


  } else {

    //update
    this.updatePatientRecord(form);
    this.resetForm(form);
    this.router.navigateByUrl('/reception/home');


  }
}

 //Insert Method
 insertPatientRecord(form?: NgForm) {
  console.log("Inserting a record....");
  this.updatePatientService.insertPatient(form.value).subscribe(res => {
    console.log(res);
    this.toastr.success('Patient record Inserted Successfully', 'CMS App V2022');
  },
    err => {
      console.log(err);
    }
  );
}

 //Update Method
 updatePatientRecord(form?: NgForm) {
  console.log("Updating a record....");
  this.updatePatientService.UpdatePatient(form.value).subscribe(res => {
    console.log(res);
    console.log('Success');
    this.toastr.success('Patient record Updated Successfully','CMS App V2022'
    );
  },
    err => {
      console.log(err);
    }
  );
}

//Clear all contents after submit
resetForm(form?: NgForm) {
  if (form != null) {
    form.resetForm();
  }
}
  }


