import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { LabtestService } from 'src/app/shared/labtest.service';

@Component({
  selector: 'app-indiviualreport',
  templateUrl: './indiviualreport.component.html',
  styleUrls: ['./indiviualreport.component.scss']
})
export class IndiviualreportComponent implements OnInit { page:number=1;
  filter:string='';
  patientId:number=0;
  PatientName:string='';


  constructor(
    public labTestService: LabtestService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public app: AppComponent,
    private auth: AuthService
  ) {
    this.route.paramMap.subscribe(params=>{
      this.patientId=Number(params.get('PatientId')) //+ string to number
  })

  }



  ngOnInit(): void {
    this.labTestService.getIndividualReport(this.patientId);
    this.getPatientById(this.patientId);
  }



  //function to logout from lab technician page
  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
  getPatientById(patientId: number) {
    console.log('Finding the patient..');
    console.log(patientId);
    this.labTestService.getPatientById(Number(patientId)).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success(
          'Test History found'
        );

        var datePipe = new DatePipe('en-UK');
        let formattedDate: any = datePipe.transform(
          res.ReportDateTime,
          'yyyy-MM-dd'
        );
        res.ReportDateTime = formattedDate;

        this.labTestService.formData = Object.assign({}, res);
      },
      (err) => {
        console.log(err);
        this.toastr.error('Test History Not found');
      }
    );
  }

}
