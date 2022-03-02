import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
import { jsPDF } from 'jspdf';
import { ReceptionService } from 'src/app/shared/reception.service';
import { Token } from 'src/app/shared/token';
import { TokenQueue } from 'src/app/shared/token-queue';
import { FormBuilder, NgForm } from '@angular/forms';
import { PaymentsService } from 'src/app/shared/payments.service';
import { DatePipe } from '@angular/common';

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
  today: Date;
  Bill: {} = {
    ConsultationDateTime: '',
    ConsultationAmount: 200,
    PatientId: '',
    StaffId: '',
  };

  @ViewChild('content', { static: false }) el1: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el1.nativeElement, {
      callback: (pdf) => {
        pdf.save('Reception-Bill.pdf');
      },
    });
  }
  checkoutForm = this.formBuilder.group({});

  constructor(
    public receptionService: ReceptionService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public paymentService: PaymentsService,
    private auth: AuthService
  ) {}

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

  savebill(patientId: number, staffId: number) {
    this.today = new Date();
    var datePipe = new DatePipe('en-UK');

    let formattedDate: any = datePipe.transform(
      this.today,

      'yyyy-MM-dd'
    );
    this.Bill = {
      ConsultationDateTime: formattedDate,
      ConsultationAmount: 200,
      PatientId: patientId,
      StaffId: 1,
    };
    console.log('From console', this.Bill);
    this.paymentService.savebill(this.Bill);

    this.toastr.success('Bill Saved');
    this.router.navigateByUrl('reception/home');
  }

  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
}
