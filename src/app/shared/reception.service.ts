//@ts-check
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenQueue } from 'src/app/shared/token-queue';
import { Patients } from 'src/app/shared/patients';
import { Doctors } from 'src/app/shared/doctors';
//import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Token } from 'src/app/shared/token';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReceptionService {
  queueList: TokenQueue[];
  patients: Patients[];
  formData: Patients = new Patients();
  token: TokenQueue = new TokenQueue();
  doctors: Doctors[];

  formData2: Token = new Token();


  $isPass = new EventEmitter();
  pat: Patients = {
    PatientId: 0,
    PatientName: '',
  };


  constructor(private client: HttpClient) {}

  //List token queue
  getTokenQueue() {
    return this.client
      .get(environment.newUrl + 'receptionist/tokenqueue')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.queueList = data as TokenQueue[];
        this.token = this.queueList[this.queueList.length - 1];
        console.log(this.token);
      });
  }

  //Get patient
  getPatients() {
    return this.client
      .get(environment.newUrl + 'receptionist/patients')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.patients = data as Patients[];
      });
  }

  //Get doctor
  getDoctors() {
    return this.client
      .get(environment.newUrl + 'receptionist/doctors')
      .toPromise()
      .then((data) => {
        console.log(data);
        this.doctors = data as Doctors[];
      });
  }

  //Generate token
  generateToken(token: TokenQueue) {
    return this.client
      .post(environment.newUrl + 'receptionist/token', token)
      .toPromise()
      .then((data) => {
        console.log(data);
        console.log('Token Generated Successfully');
      });
  }

  getpatientwithid(patientId: number):Observable<any> {
    //window.location.reload();
    return this.client.get(
      environment.newUrl+ 'receptionist/token/patientid/' + patientId
    );
  }

  //Delete token
  deleteToken(tokenId: number) {
    return this.client.delete(
      environment.newUrl + 'receptionist/deletetoken/' + tokenId
    );
  }


}
