import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  medicineList:Medicinedoc[];
  insertmedicine:Medicinedoc[];

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
  httpClient: any;

  constructor(private client: HttpClient) {}


  //Get Medicine
  getMedicines() {
    return this.client
      .get(environment.updateUrl + 'doctor/viewMedicinelists')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.medicines = data as Medicinedoc[];
      });
  }


  //Generate Medicnes
  generateMedicine(medicines: Medicinedoc) {
    return this.client
      .post(environment.apiUrl + 'doctor/addmedicine', medicines)
      .toPromise()
      .then((data) => {
        console.log(data);
        console.log('Medicine added sucessfully');
      });
  }


  //Insert Medicine
 insertMedicine(insertmedicine: Medicinedoc): Observable<any> {
  return this.httpClient.post(
    environment.updateUrl  + 'doctors/addmedicine',insertmedicine);
  }

  //Get Selected medicine
  getSelectedMedicines() {
    return this.client
      .get(environment.updateUrl + 'doctors/Getmedicine')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.medicineList = data as Medicinedoc[];
      });
  }


}
