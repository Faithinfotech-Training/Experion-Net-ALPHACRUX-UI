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
import { VitalsComponent } from './doctor/advice/vitals/vitals.component';
import { DiagnosisComponent } from './doctor/advice/diagnosis/diagnosis.component';
import { PatientListComponent } from './doctor/patient-list/patient-list.component';
import { MedicineComponent } from './doctor/advice/medicine/medicine.component';
import { TestsComponent } from './doctor/advice/tests/tests.component';
import { LabTechnicianComponent } from './lab-technician/lab-technician.component';
import { LabTestReportComponent } from './lab-technician/lab-test-report/lab-test-report.component';

const routes: Routes = [
  { path: 'doctor/advice', component: AdviceComponent },
  { path: 'reception/home', component: HomePageComponent },
  { path: 'reception/payments/:id', component: PaymentsComponent,data:[{isPat:true}] },
  { path: 'reception/register-patient', component: RegisterPatientComponent },
  { path: 'reception/transactions', component: TransactionsComponent },
  { path: 'reception/update-patient', component: UpdatePatientComponent },
  { path: 'app-administrator', component: AdministratorComponent },
  { path: 'doctor/home', component: DoctorComponent  },
  { path: 'doctor/advice', component: AdviceComponent },
  { path: 'doctor/advice/diagnosis', component: DiagnosisComponent },
  { path: 'doctor/advice/vitals', component:VitalsComponent},
  { path: 'doctor/advice/medicine', component:MedicineComponent},
  { path: 'doctor/advice/tests', component:TestsComponent},
  { path: 'lab/home', component:LabTechnicianComponent},
  { path: 'lab/home/test', component:LabTestReportComponent},
  { path: '**', component: AppComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
