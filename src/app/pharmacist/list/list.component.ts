import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { PharmacistService } from 'src/app/shared/pharmacist.service';
import { MedPrescriptionList } from 'src/app/shared/med-prescription-list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  page: number = 1;
  filter:string;
  medicineList:any=new MedPrescriptionList();
  constructor(
    private auth: AuthService,
    private router: Router,
    public pharmacyService: PharmacistService
  ) {}

  ngOnInit(): void {
    this.pharmacyService.getAllMedicines();
  }
  logout() {
    console.log('inside logout');
    this.auth.logOut();

    this.router.navigateByUrl('/login');
  }
}
