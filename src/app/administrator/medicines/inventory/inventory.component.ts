import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  medicineForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public admin: AdminService,
    private toast: ToastrService
  ) {
    this.medicineForm = this.fb.group({
      InventoryId: 0,
      ManufactureId: 0,
      quantities: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.admin.getMfgs();
    this.admin.getMedicineDetails();
    this.addQuantity();
  }

  quantities(): FormArray {
    return this.medicineForm.get('quantities') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      MedicineQuantity: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      MedicineId: 0,
      MedicineType: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
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
    this.medicineForm.reset();
    this.toast.success('Inventory Added Successfully', 'Success');
  }
}
