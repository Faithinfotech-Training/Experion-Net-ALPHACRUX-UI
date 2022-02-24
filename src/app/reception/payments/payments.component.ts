import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { jsPDF } from 'jspdf';
import { ReceptionService } from 'src/app/shared/reception.service';
import { Token } from 'src/app/shared/token';
import { TokenQueue } from 'src/app/shared/token-queue';
import { FormBuilder } from '@angular/forms';
import { PaymentsService } from 'src/app/shared/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  patientID: number;
  patientName: string;
  StaffName: string;
  Amount: number;
  Billdate: Date = new Date();
  queueList: any = new TokenQueue();

  @ViewChild('content', { static: false }) el1: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el1.nativeElement, {
      callback: (pdf) => {
        pdf.save('Reception-Bill.pdf');
      },
    });

  }

  constructor(
    public receptionService: ReceptionService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder:FormBuilder,
    private paymentService: PaymentsService,
    private auth:AuthService
  )
  {}

  ngOnInit(): void {
    this.receptionService.$isPass.subscribe((data) => {
      console.log('I got in console', data.PatientId);
      this.receptionService
        .getpatientwithid(data.PatientId)
        .subscribe((res) => {
          console.log(res);
          this.receptionService.token = Object.assign({}, res);
        });
    });
  }
  checkoutForm = this.formBuilder.group({
  ConsultationDateTime:null,
  ConsultationAmount:200,
  PatientId: null,
  PatientName:null,
  StaffId: null,
  StaffName: null,
  });

  generatebill() {

      this.toastr.success('Bill Saved Successfully', 'CMS App V2022');
      this.paymentService.savebill(this.checkoutForm.value);
    this.router.navigateByUrl('/reception/home');
  }
  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
}
