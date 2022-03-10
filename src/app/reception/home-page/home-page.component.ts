import { Token } from '@angular/compiler';
import { Component,OnInit} from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientListServiceService } from 'src/app/shared/patient-list-service.service';
import { ReceptionService } from 'src/app/shared/reception.service';
import { TokenQueue } from 'src/app/shared/token-queue';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  page: number = 1;
  queueList:any=new  TokenQueue();
  filter:string;

  constructor(
    public reception: ReceptionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    }

  ngOnInit(): void {

    this.reception.getPatients();
    this.reception.getDoctors();
    this.reception.getTokenQueue();
  }

  checkoutForm = this.formBuilder.group({
    PatientId: null,
    StaffId: null,
    TokenNum: null,
  });

  onSubmit(): void {
    // Process checkout data here
   this.checkoutForm.patchValue({
      TokenNum: this.reception.token.TokenNumber + 1,
    });
    if (
      this.checkoutForm.value.PatientId != null &&
      this.checkoutForm.value.StaffId != null
    ) {
      this.toastr.success('Token successfully generated', 'Successfull!');
      this.reception.generateToken(this.checkoutForm.value);
      this.reception.pat.PatientId = this.checkoutForm.value.PatientId;
     // this.reception.$isPass.emit(this.reception.pat);
      this.router.navigateByUrl('/reception/payments/'+ this.reception.pat.PatientId+'/'+this.checkoutForm.value.StaffId);
     //this.router.navigate(['/reception/payments']);
    }
    else {
      this.toastr.error('Please select a patient and a doctor', 'Error!');
      this.checkoutForm.reset();
    }
  }

  //Delete token
  deleteToken(tokenId: number) {
    if (confirm('Are you sure you want to DELETE this token?')) {
      console.log(tokenId);
      this.reception.deleteToken(tokenId).subscribe(
        (response) => {
          this.toastr.success('Token Deleted Successfully', 'CMS App V2022');
          console.log('This is token',response);
          this.reception.getTokenQueue();
          this.router.navigate(['/reception/home']);

        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
