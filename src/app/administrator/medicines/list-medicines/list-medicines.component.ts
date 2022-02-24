import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-medicines',
  templateUrl: './list-medicines.component.html',
  styleUrls: ['./list-medicines.component.scss'],
})
export class ListMedicinesComponent implements OnInit {
  page: number = 1;
  filter: string;


  constructor(public admin: AdminService, private modalService: NgbModal) {}

  ngOnInit(): void {
    //Get list of medicines
    this.admin.getMedicines();




    // if (this.staffId != 0 || this.staffId != null) {
    //   //Get stffId by id
    //   this.admin.getStaffById(this.staffId).subscribe(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // }
  }

  open(content, id:number) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.admin.getInventoryById(id);
  }

  //Delete Inventory
  del(id: number) {
    if (confirm('Are you sure you want to DELETE this record?')) {
       this.admin.deleteInventory(id).subscribe(
         (response) => {
           this.admin.getMedicines();
           window.location.reload();
         },
         (error) => {
           console.log(error);
         }
       );
    }
  }

}
