import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  medicineForm: FormGroup;

  constructor(private fb: FormBuilder, public admin: AdminService) {
    this.medicineForm = this.fb.group({
      InventoryId: 0,
      ManufactureId: 0,
      quantities: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.admin.getMfgs();
    this.admin.getMedicineDetails();
  }

  quantities(): FormArray {
    return this.medicineForm.get('quantities') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      MedicineQuantity: 0,
      MedicineId: 0,
      MedicineType: '',
    });
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  onSubmit() {
    console.log(this.medicineForm.value);
  }
}
