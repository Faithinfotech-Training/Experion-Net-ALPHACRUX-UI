import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { LabtestService } from 'src/app/shared/labtest.service';

@Component({
  selector: 'app-labreport',
  templateUrl: './labreport.component.html',
  styleUrls: ['./labreport.component.scss']
})
export class LabreportComponent implements OnInit {
  reportId:number=0;
  page:number=1;
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
      this.reportId=Number(params.get('ReportId')) //+ string to number
  })

  }


  ngOnInit(): void {
    this.labTestService.getNewReport(this.reportId);
    this.newDate = new Date();
    var datePipe = new DatePipe('en-UK');

    this.today = datePipe.transform(this.newDate, 'yyyy-MM-dd');

  }
  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
  close(){
    this.router.navigateByUrl('/lab/home/reports');
  }
  @ViewChild('report', { static: false }) el1: ElementRef;

  generatePDF() {
    let pdf = new jsPDF('p', 'pt', 'a2');

    pdf.html(this.el1.nativeElement, {
      callback: (pdf) => {
        pdf.save('Lab-Report.pdf');
      },
    });
  }
}
