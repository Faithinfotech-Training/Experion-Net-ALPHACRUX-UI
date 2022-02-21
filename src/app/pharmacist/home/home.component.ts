import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/shared/auth.service';
import { Medlist } from 'src/app/shared/medlist';
import { Pharmacist } from 'src/app/shared/pharmacist';
import { PharmacistService } from '../../shared/pharmacist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  patientId: number;
  NgForm = NgForm;
  page: number = 1;
  Pharmacist: any = new Pharmacist();
  total=0;
  value;
  lab:any;
  public Med:Medlist[]=[];


  //For calculate Total Price,Qty and Grand Total price
  public totalPrice: number = 0;
  public totalQty: number = 0;
  public GrandtotalPrice: number = 0;


  //values
  PrescriptionDateTime:any;
  MedBillAmount:any;
  MedListId:any;
  PatientId:any;
  MedicineQuantity:any;
  amnt:number=0;




  constructor(
    public pharmacyService: PharmacistService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public app:AppComponent,
    private auth:AuthService) { }



  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    let PatientId = this.pharmacyService.formData1.PatientId;
    //INSERT / UPDATE

    if (PatientId != 0 || PatientId != null) {

      let PrescriptionId = this.pharmacyService.formData1.PrescriptionId;
    console.log(PrescriptionId);
      this.getPatientById(form);
    }
    else{
      console.log('Enter valid Patient Id')
    }
  }

  onClick(form: NgForm) {
    console.log(form.value);
    let PrescriptionId = this.pharmacyService.formData1.PrescriptionId;
    console.log(PrescriptionId);
    if (PrescriptionId != 0 || PrescriptionId != null) {
      this.getTest(form);
    } else {

      console.log('Enter valid Patient Id')
    }
  }



  //get patient

  onClickClick(form: NgForm){
    this.PrescriptionDateTime=new Date();
    var datePipe = new DatePipe('en-UK');
    let formattedDate: any = datePipe.transform(
      this.PrescriptionDateTime,
      'yyyy-MM-dd'
    );
    this.MedListId=document.getElementById('TestListId');
    this.PatientId=document.getElementById('PatientId');
    this.MedBillAmount=document.getElementById('total');

    this.lab={LabBillDateTime:formattedDate,MedListId: this.MedListId,
      PatientId:this.PatientId,MedBillAmount:this.MedBillAmount}
this.post(this.lab);
  }
  getPatientById(form?: NgForm) {
    console.log('Finding the patient..');
    this.pharmacyService
      .getPatientById(this.pharmacyService.formData1.PatientId)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Patient data found', 'CMS App V2022');

          //Format date
          var datePipe = new DatePipe('en-UK');
          let formattedDate: any = datePipe.transform(
            res.PrescriptionDateTime,
            'yyyy-MM-dd'
          );
          res.PrescriptionDateTime = formattedDate;
          //Assign this response to updatePatientservice formData
          this.pharmacyService.formData1 = Object.assign({}, res);
        },
        (err) => {
          console.log(err);
          this.toastr.error('Patient data not found, Please verify Patient Id', 'CMS App V2022');
        }
      );
  }
  clientProductForm = new FormGroup({
    productQty: new FormControl("", Validators.required)
  });




  getTest(form?: NgForm) {

    console.log('Finding the tests..');
    console.log(this.pharmacyService.formData1.PrescriptionId)
    this.pharmacyService
      .getTests(this.pharmacyService.formData1.PrescriptionId)
    }
    post(med){
      console.log('Trying to insert values..');
      this.pharmacyService.postBills(med);
    }

    onSubmitted(qty:number){

    }

    //to calculate and display the total price information in Shopping cart.
    getItemTotalresult() {
      this.totalPrice = 0;
      this.totalQty = 0;
      this.GrandtotalPrice = 0;
      var count: number = 0;
      for (count = 0; count < this.Med.length; count++) {
        console.log(count);
          this.totalPrice += this.Med[count].MedicinePrice;
          this.totalQty += (this.Med[count].MedicineQuantity);

          this.GrandtotalPrice += this.Med[count].MedicinePrice * this.Med[count].MedicineQuantity;
          console.log(this.GrandtotalPrice);

      }
      console.log(this.GrandtotalPrice);
      


  }
  onProceed(){
    this.toastr.success('Bill generated Successfully', 'CMS App V2022');
    let currentUrl = this. router. url;
    console.log(currentUrl);
  this. router. routeReuseStrategy. shouldReuseRoute = () => true;
  this. router. onSameUrlNavigation = 'reload';
  this. router. navigate([currentUrl]);
  }
  logout(){
    console.log('inside logout')
    this.auth.logOut();

    this.router.navigateByUrl('/login')
  }

  }


