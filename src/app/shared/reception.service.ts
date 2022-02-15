//@ts-check
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenQueue } from 'src/app/shared/token-queue';
import { Patients } from 'src/app/shared/patients';
import { Doctors } from 'src/app/shared/doctors';

@Injectable({
  providedIn: 'root',
})
export class ReceptionService {
  queueList: TokenQueue[];
  patients: Patients[];
  formData: Patients = new Patients();
  token: TokenQueue;
  doctors: Doctors[];

  constructor(private client: HttpClient) {}

  //List token queue
  getTokenQueue() {
    return this.client
      .get(environment.apiUrl + 'receptionist/tokenqueue')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.queueList = data as TokenQueue[];
      });
  }

  //Get patient
  getPatients() {
    return this.client
      .get(environment.apiUrl + 'receptionist/patients')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.patients = data as Patients[];
      });
  }

  //Get doctor
  getDoctors() {
    return this.client
      .get(environment.apiUrl + 'receptionist/doctors')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.doctors = data as Doctors[];
      });
  }
}
