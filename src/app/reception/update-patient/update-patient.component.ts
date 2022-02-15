import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatePatientService } from '../../shared/update-patient.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {
  patientId:number;

  constructor(public updatePatientService: UpdatePatientService,
    private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.patientId = this.route.snapshot.params['patientId'];
    this.patientId =1

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
    this.router.navigateByUrl('');


  } else {

    //update
    this.updatePatientRecord(form);
    this.resetForm(form);
    this.router.navigateByUrl('');


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


