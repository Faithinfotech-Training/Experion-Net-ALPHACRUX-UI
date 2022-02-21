import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { DiagnosisService } from '../../../shared/diagnosis.service'

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  patientId:number;
  StaffId:Number;
  NgForm=NgForm;

  constructor(public diagnosisService: DiagnosisService,
    private router: Router,private route: ActivatedRoute,private toastr: ToastrService,
    private auth:AuthService) { }

  ngOnInit(): void {this.patientId = this.route.snapshot.params['patientId'];
  this.patientId =13;
  this.StaffId =1;
    console.log('insiide oninit')
  if (this.patientId != 0 || this.patientId != null) {

    //Get patient by id
    this.diagnosisService.getPatientById(this.patientId).subscribe(
        response =>{
        console.log(response);

        //Format date
        var datePipe = new DatePipe("en-UK");
        let formattedDate:any =datePipe.transform(response.PatientDob, 'yyyy-MM-dd');
        response.DateOfJoining = formattedDate;
        //Assign this response to doctorPatientservice formData
        this.diagnosisService.formData = Object.assign({}, response);
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
  let addId = this.diagnosisService.formData.PatientId;

  //Insert or update
  if (addId != 0 || addId != null) {

    //Insert
    this.insertDoctorNote(form);
    this.resetForm(form);
    this.router.navigateByUrl('/doctor/advice/tests')


  } else {

    console.log('An Error has occured');


  }
}

 //Insert Method
 insertDoctorNote(form?: NgForm) {
  console.log("Inserting a record....");
  this.diagnosisService.insertNote(form.value).subscribe(res => {
    console.log(res);
    this.toastr.success('Patient diagnosis Inserted Successfully', 'CMS App V2022');

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


logout(){
  console.log('inside logout')
  this.auth.logOut();

  this.router.navigateByUrl('/login')
}
  }











