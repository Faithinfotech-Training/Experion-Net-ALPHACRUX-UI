import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { LabtestService } from 'src/app/shared/labtest.service';

@Component({
  selector: 'app-billgeneration',
  templateUrl: './billgeneration.component.html',
  styleUrls: ['./billgeneration.component.scss']
})
export class BillgenerationComponent implements OnInit {
  billId:number;
  page:number=1;
  total:number=0;
  today:any;
  newDate:Date;

  constructor(
    public labTestService: LabtestService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public app: AppComponent,
    private auth: AuthService
  ) {
    this.route.paramMap.subscribe(params=>{
      this.billId=Number(params.get('BillId'))
      this.total=Number(params.get('Total'))
  })

  }


  ngOnInit(): void {

    this.newDate = new Date();
    var datePipe = new DatePipe('en-UK');

    this.today = datePipe.transform(this.newDate, 'yyyy-MM-dd');
    this.labTestService.getIndividualReport(this.billId);

  }
  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
  @ViewChild('bill', { static: false }) el1: ElementRef;

  generatePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');

    pdf.html(this.el1.nativeElement, {
      callback: (pdf) => {
        pdf.save('Lab-Bill.pdf');
      },
    });
  }
  close(){
    this.router.navigateByUrl('/lab/home/reports')

  }


}
