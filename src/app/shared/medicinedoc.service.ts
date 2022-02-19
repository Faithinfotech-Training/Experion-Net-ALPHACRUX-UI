import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medicinedoc } from './medicinedoc';
import { Patients } from './patients';

@Injectable({
  providedIn: 'root'
})
export class MedicinedocService {
  patients: Patients[];
  formData: Patients = new Patients();
  medicines: Medicinedoc[];
  
  $isPass= new EventEmitter();
  pat:Medicinedoc=
  {
    MedicineId:0,
    MedicineName:''
  };
  $isDoc=new EventEmitter();
  doc:Medicinedoc=
  {

 MedicineId: 0,
 MedicineName:''
 }

  constructor(private client: HttpClient) {}


  //Get Medicine
  getMedicines() {
    return this.client
      .get(environment.updateUrl + 'doctors/viewMedicinelists')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.patients = data as Patients[];
      });
  }


  //Generate Medicnes
  generateMedicne(medicines: Medicinedoc) {
    return this.client
      .post(environment.apiUrl + 'doctor/advice/medicine', medicines)
      .toPromise()
      .then((data) => {
        console.log(data);
        console.log('Medicine added sucessfully');
      });
  }




}
