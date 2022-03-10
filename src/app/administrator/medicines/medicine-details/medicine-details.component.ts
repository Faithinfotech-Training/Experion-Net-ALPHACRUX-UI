import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss'],
})
export class MedicineDetailsComponent implements OnInit {
  filter: string;
  page: number = 1;
  constructor(public admin: AdminService) {}

  ngOnInit(): void {
    this.admin.getMedicineDetails();
  }

  //Delete MedicieDetails
  del(id: number) {
    if (confirm('Are you sure you want to DELETE this record?')) {
      this.admin.deleteMedicine(id).subscribe(
        (response) => {
          this.admin.getMedicineDetails();
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
