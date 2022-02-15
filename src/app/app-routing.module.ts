import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './reception/home-page/home-page.component';
import { PaymentsComponent } from './reception/payments/payments.component';
import { RegisterPatientComponent } from './reception/register-patient/register-patient.component';
import { TransactionsComponent } from './reception/transactions/transactions.component';
import { UpdatePatientComponent } from './reception/update-patient/update-patient.component';
import {AdministratorComponent} from './administrator/administrator.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AdviceComponent } from './doctor/advice/advice.component';
import { AppointmentsComponent } from './doctor/appointments/appointments.component';
import { PatientListComponent } from './doctor/patient-list/patient-list.component';

const routes: Routes = [
  { path: 'doctor/advice', component: AdviceComponent },
  { path: 'doctor/appointments', component: AppointmentsComponent },
  { path: 'doctor/patients', component: PatientListComponent },
  { path: 'reception/home', component: HomePageComponent },
  { path: 'reception/payments/:id', component: PaymentsComponent,data:[{isPat:true}] },
  { path: 'reception/register-patient', component: RegisterPatientComponent },
  { path: 'reception/transactions', component: TransactionsComponent },
  { path: 'reception/update-patient', component: UpdatePatientComponent },
  { path: 'app-administrator', component: AdministratorComponent },
  { path: '**', component: AppComponent },
  {path: 'doctor',component:DoctorComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
