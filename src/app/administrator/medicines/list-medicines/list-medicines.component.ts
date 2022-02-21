import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-list-medicines',
  templateUrl: './list-medicines.component.html',
  styleUrls: ['./list-medicines.component.scss'],
})
export class ListMedicinesComponent implements OnInit {
  page: number = 1;
  filter: string;

  constructor(public admin: AdminService) {}

  ngOnInit(): void {
    //Get list of medicines
    this.admin.getMedicines();
  }
}
