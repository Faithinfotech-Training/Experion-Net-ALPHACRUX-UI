import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatePatientService } from '../../shared/update-patient.service';
import { UpdatePatient } from '../../shared/update-patient';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReceptionService } from 'src/app/shared/reception.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss'],
})
export class UpdatePatientComponent implements OnInit {
  patientId: number = 0;
  NgForm = NgForm;
  Patient = new UpdatePatient();

  constructor(
    public updatePatientService: UpdatePatientService,
    public reception: ReceptionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.reception.getPatients();
  }
  checkoutForm = this.formBuilder.group({
    PatientId: this.patientId,
  });

  //Submit form
  onSubmit(form: NgForm): void {
    //Insert or update
    console.log(this.checkoutForm.value.PatientId);
      this.getPatientwithPatientId();


    if (this.checkoutForm.value.PatientId != null) {
    } else {
      //Update
      //Insert
      this.insertPatientRecord(form);
      this.resetForm(form);
      this.toastr.success(
        'Patient record Not Found, Please Register',
        'CMS App V2022'
      );
    }
  }

  //Insert Method
  insertPatientRecord(form?: NgForm) {
    console.log('Inserting a record....');
    this.updatePatientService.insertPatient(form.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(
          'Patient record Inserted Successfully',
          'CMS App V2022'
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onClick(patientId: number) {
    console.log('Finding the record....');

    // let PatientId = document.getElementById('PatientId').innerHTML;
    console.log(patientId);
  }

  //Update Method
  updatePatientRecord(form?: NgForm) {
    console.log('Updating a record....');
    this.updatePatientService
      .UpdatePatient(form.value)
      .subscribe(
        (res) => {
          console.log(res);
          console.log('Success');
          this.toastr.success(
            'Patient record Updated Successfully',
            'CMS App V2022'
          );
          this.router.navigateByUrl('reception/home');
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getPatientwithPatientId() {
      this.updatePatientService.getPatientById(
        this.checkoutForm.value.PatientId
      ).toPromise().then((data) => {
        //Format date
        var datePipe = new DatePipe('en-UK');
        let formattedDate: any = datePipe.transform(
          data.PatientDob,
          'yyyy-MM-dd'
        );
        data.PatientDob = formattedDate;
        //Assign this response to empservice formData
        this.Patient = Object.assign({}, data);
        console.log(this.Patient);
      },
      (err) => {
        console.log(err);
      });
  }

  //Clear all contents after submit
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
}
