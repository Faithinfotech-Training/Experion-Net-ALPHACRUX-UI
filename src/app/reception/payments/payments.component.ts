import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  staffID: number;
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
    StaffId: ''
  };

  @ViewChild('bill', { static: false }) el1: ElementRef;

  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');
    pdf.html(this.el1.nativeElement, {
      callback: (pdf) => {
        pdf.save('Reception-Bill.pdf');
      },
    });
  }
  checkoutForm = this.formBuilder.group({});

  constructor(
    public receptionService: ReceptionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public paymentService: PaymentsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{
      this.patientID=Number(params.get('PatientId'));
      this.staffID=Number(params.get('StaffId'));

    });
    console.log("from url",this.patientID);
    this.receptionService.getpatientwithid(this.patientID).subscribe((res)=>
    {
      this.receptionService.token=Object.assign({}, res);
    })
  }

  savebill(patientId: number, staffId: number) {
    this.today = new Date();
    console.log('save bill',patientId);
    console.log('save bill',staffId);
    var datePipe = new DatePipe('en-UK');

    let formattedDate: any = datePipe.transform(
      this.today,

      'yyyy-MM-dd'
    );
    this.Bill = {
      ConsultationDateTime: formattedDate,
      ConsultationAmount: 200,
      PatientId: patientId,
      StaffId: this.staffID
    };
    console.log('From console', this.Bill);
  //  this.paymentService.savebill(this.Bill);
    this.post(this.Bill);

  }

  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
  post(obj:any){
    this.paymentService.savebill(obj).subscribe((res)=>{
      console.log('inside post',res);
      this.toastr.success('Bill Saved');
      this.router.navigateByUrl('reception/home');
    })
  }
}
