import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home/reception/home-page/home-page.component';
import { PaymentsComponent } from './home/reception/payments/payments.component';
import { RegisterPatientComponent } from './home/reception/register-patient/register-patient.component';
import { TransactionsComponent } from './home/reception/transactions/transactions.component';
import { UpdatePatientComponent } from './home/reception/update-patient/update-patient.component';
import {AdministratorComponent} from './home/administrator/administrator.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reception/home', component: HomePageComponent },
{ path: 'home', component: HomeComponent },
{ path: 'reception/payments', component: PaymentsComponent },
{ path: 'reception/register-patient', component: RegisterPatientComponent },
{ path: 'reception/transactions', component: TransactionsComponent },
{ path: 'reception/update-patient', component: UpdatePatientComponent },
{ path: 'app-administrator', component: AdministratorComponent },
{ path: '**', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
