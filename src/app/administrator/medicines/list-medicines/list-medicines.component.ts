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
  id: number = 0;
  inventory: any = [];

  constructor(public admin: AdminService, private modalService: NgbModal) {}

  ngOnInit(): void {
    //Get list of medicines
    this.admin.getMedicines();
  }

  open(content, id:number) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.admin.getInventoryById(id).subscribe(
      (response) => {
        console.log(response);
        this.inventory = response;
      }
    );
  }

  updateQuantity(quantity: number) {
    this.inventory.MedicineQuantity = quantity;
    console.log(this.inventory);
    this.admin.updateInventory(this.inventory).subscribe(
      (response) => {
        console.log(response);
        this.admin.getMedicines();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Delete Inventory
  del(id: number) {
    if (confirm('Are you sure you want to DELETE this record?')) {
       this.admin.deleteInventory(id).subscribe(
         (response) => {
           this.admin.getMedicines();
           console.log(response);
         },
         (error) => {
           console.log(error);
         }
       );
    }
  }

}
