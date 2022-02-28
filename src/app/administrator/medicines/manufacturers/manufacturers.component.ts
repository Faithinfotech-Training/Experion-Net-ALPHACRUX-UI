import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss'],
})
export class ManufacturersComponent implements OnInit {
  filter: string;
  page: number = 1;
  constructor(public admin: AdminService) {}

  ngOnInit(): void {
    this.admin.getMfgs();
  }

  //Delete Manufacturer
  del(id: number) {
    if (confirm('Are you sure you want to DELETE this record?')) {
      this.admin.deleteManufacture(id).subscribe(
        (response) => {
          this.admin.getMfgs();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
