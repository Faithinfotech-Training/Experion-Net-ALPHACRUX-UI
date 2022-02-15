import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './reception/home-page/home-page.component';
import { PaymentsComponent } from './reception/payments/payments.component';
import { RegisterPatientComponent } from './reception/register-patient/register-patient.component';
import { TransactionsComponent } from './reception/transactions/transactions.component';
import { UpdatePatientComponent } from './reception/update-patient/update-patient.component';
import {AdministratorComponent} from './administrator/administrator.component';
import { AdviceComponent } from './doctor/advice/advice.component';
import { DoctorComponent } from './doctor/doctor.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'reception/home', component: HomePageComponent },
  { path: 'reception/payments', component: PaymentsComponent },
  { path: 'reception/register-patient', component: RegisterPatientComponent },
  { path: 'reception/transactions', component: TransactionsComponent },
  { path: 'reception/update-patient', component: UpdatePatientComponent },
  { path: 'app-administrator', component: AdministratorComponent },
  { path: '**', component: AppComponent },
  { path: 'doctor/doctor-advice',component:AdviceComponent},
  { path: 'doctor',component:DoctorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
