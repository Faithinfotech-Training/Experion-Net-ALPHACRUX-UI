import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VitalsService } from 'src/app/shared/vitals.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss'],
  
})
export class VitalsComponent implements OnInit {
  [x: string]: any;
  patientId:number;
  NgForm=NgForm;

  constructor(public vitalsService: VitalsService,
    private router: Router,private route: ActivatedRoute,private toastr: ToastrService) { }

    ngOnInit(): void {

      this.patientId = this.route.snapshot.params['patientId'];
       this.patientId =1

    }

 //Submit form
 onSubmit(form: NgForm) {
  console.log(form.value);
  let addId = this.vitalsService.formData.PatientId;

  //Insert or update
  if (addId != 0 || addId != null) {

    //Insert
    this.insertPatientRecord(form);
    this.resetForm(form);
    this.router.navigateByUrl('');


  } else {

    //update
    console.log("Error for insert")

  }
}
  //Insert Method
 insertPatientRecord(form?: NgForm) {
  console.log("Inserting a record....");
  this.vitalsService.insertVitals(form.value).subscribe(res => {
    console.log(res);
    this.toastr.success('Patient record Inserted Successfully', 'CMS App V2022');
  },
    err => {
      console.log(err);
    }
  );
}


    }







