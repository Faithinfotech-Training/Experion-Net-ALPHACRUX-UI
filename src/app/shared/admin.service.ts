import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Staffs } from './staffs';
import { Roles } from './roles';
import { Medicines } from './medicines';
import { Qualifications } from './qualifications';
import { MedicineDetails } from './medicine-details';
import { Manufactures } from './manufactures';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  staffs: Staffs[];
  roles: Roles[];
  medicines: Medicines[];
  qualifications: Qualifications[];
  mfgs: Manufactures[];
  medicineDetails: MedicineDetails[];
  formData: Staffs = new Staffs();
  constructor(private client: HttpClient) {}

  //List roles
  getRoles() {
    return this.client
      .get(environment.apiUrl + 'admin/roles')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.roles = data as Roles[];
      });
  }

  //list qualifications
  getQualifications() {
    return this.client
      .get(environment.apiUrl + 'admin/qualifications')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.qualifications = data as Qualifications[];
      });
  }

  //list Staffs
  getStaffs() {
    return this.client
      .get(environment.apiUrl + 'admin/liststaffs')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.staffs = data as Staffs[];
      });
  }

  //Add a new staff
  addStaff(staff: Staffs): Observable<any> {
    return this.client.post(environment.apiUrl + 'admin/staff', staff);
  }

  //Get staff by id
  getStaffById(staffId: number): Observable<any> {
    return this.client.get(environment.apiUrl + 'admin/staff/' + staffId);
  }

  //Update staff
  updateStaff(staff: Staffs): Observable<any> {
    return this.client.put(environment.apiUrl + 'admin/updatestaff', staff);
  }

  //List Medicines
  getMedicines() {
    return this.client
      .get(environment.apiUrl + 'admin/medicines')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.medicines = data as Medicines[];
      });
  }

  //List Manufacturers
  getMfgs() {
    return this.client
      .get(environment.apiUrl + 'admin/mfgs')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.mfgs = data as Manufactures[];
      });
  }

  //List Medicine Detials
  getMedicineDetails() {
    return this.client
      .get(environment.apiUrl + 'admin/medicinedetails')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.medicineDetails = data as MedicineDetails[];
      });
  }

  //Add a new medicine
  addMedicine(medicine: MedicineDetails): Observable<any> {
    return this.client.post(environment.apiUrl + 'admin/addmedicine', medicine);
  }

  //Delete Inventory
  deleteInventory(id: number) {
    return this.client.delete(
      environment.apiUrl + 'admin/deleteinventory/' + id
    );
  }

  //Add to inventory
  addInventory(form : NgForm): Observable<any> {
    return this.client.post(environment.apiUrl + 'admin/inventory', form);
  }

  //Get Inventory by id
  getInventoryById(id: number): Observable<any>{ 
    return this.client.get(environment.apiUrl + 'admin/inventory/' + id);
}
}
