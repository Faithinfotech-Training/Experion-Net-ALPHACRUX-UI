//import { Token } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';
//import jsPDF from 'jspdf';
//import pdfMake from 'pdfmake/build/pdfmake';
//import htmlToPdfmake from 'html-to-pdfmake';
import { ReceptionService } from 'src/app/shared/reception.service';
import { Token } from 'src/app/shared/token';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  patientID:number;
  patientName:string;
  StaffName:string;
  Amount:number;
  Billdate:Date=new Date();
  Token:any=  new Token();
/*
  @ViewChild('pdfTable') pdfTable: ElementRef;

  public downloadAsPDF() {
    const doc = new jsPDF();
    //get table html
    const pdfTable = this.pdfTable.nativeElement;
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();


  }

*/

  constructor(public receptionService : ReceptionService,private router: Router,private toastr: ToastrService,
    private auth:AuthService) {}

  ngOnInit(): void {

    this.receptionService.$isPass
    .subscribe( (data)=>{
      console.log("I got in console",data.PatientId);
      this.receptionService.getpatientwithid(data.PatientId).subscribe(res=>{console.log(res);
      this.receptionService.formData2=Object.assign({},res);
    })
     // getpatientwithid(data.PatientId);
      console.log("From payment service");
      console.log("I got in console",data.PatientId);
      console.log("PatientId");
      console.log(data.PatientId);
     ;
      this.router.navigateByUrl('/reception/home');

    })


  }

  generatebill(){
    this.toastr.success('Bill generated Successfully', 'CMS App V2022');
  }
  logout(){
    console.log('inside logout')
    this.auth.logOut();

    this.router.navigateByUrl('/login')
  }

}
function htmlToPdfmake(innerHTML: any) {
  throw new Error('Function not implemented.');
}

