//@ts-check
import { EventEmitter, Injectable } from '@angular/core';
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
  token: TokenQueue = new TokenQueue();
  doctors: Doctors[];

  $isPass= new EventEmitter();
  pat:Patients=
  {
    PatientId:0,
    PatientName:''
  };
  $isDoc=new EventEmitter();
  doc:Doctors=
  {

  DoctorId: 0,
  DoctorName:'',
  Phone:'',
  Email: '',
  RoleName:'',
  Qualification:''
  }

  constructor(private client: HttpClient) {}

  //List token queue
  getTokenQueue() {
    return this.client
      .get(environment.apiUrl + 'receptionist/tokenqueue')
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

  //Generate token
  generateToken(token: TokenQueue) {
    return this.client
      .post(environment.apiUrl + 'receptionist/token', token)
      .toPromise()
      .then((data) => {
        console.log(data);
        console.log('Token Generated Successfully');
      });
  }

  getpatientwithid(patientId:number){
    return this.client.get(
      environment.apiUrl+'Receptionist/patientid/'+patientId

    );
  }

  //Delete token
  deleteToken(tokenId: number) {
    return this.client.delete(
      environment.apiUrl + 'receptionist/deletetoken/' + tokenId
    );
  }

}
