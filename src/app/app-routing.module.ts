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
import { AppointmentsComponent } from './doctor/appointments/appointments.component';
import { PharmacistComponent } from './pharmacist/pharmacist.component';
import { ReportMedicineComponent } from './report-medicine/report-medicine.component';
import { HomeComponent } from './pharmacist/home/home.component';
import { BillingComponent } from './lab-technician/billing/billing.component';
import { LoginComponent } from './login/login.component';
import { MedicinesComponent } from './administrator/medicines/medicines.component';
import { StaffsComponent } from './administrator/staffs/staffs.component';
import { ListStaffsComponent } from './administrator/staffs/list-staffs/list-staffs.component';
import { NewStaffComponent } from './administrator/staffs/new-staff/new-staff.component';
import { ListMedicinesComponent } from './administrator/medicines/list-medicines/list-medicines.component';
import { NewMedicineComponent } from './administrator/medicines/new-medicine/new-medicine.component';
import { InventoryComponent } from './administrator/medicines/inventory/inventory.component';

const routes: Routes = [
  
  { path: 'doctor/advice', component: AdviceComponent },
  { path: 'reception/c', component: HomePageComponent },
  { path: 'reception/payments', component: PaymentsComponent},
  { path: 'reception/register-patient', component: RegisterPatientComponent },
  { path: 'reception/transactions', component: TransactionsComponent },
  { path: 'reception/update-patient', component: UpdatePatientComponent },
  { path: 'admin', component: AdministratorComponent },
  {
    path: 'admin/medicine',
    component: MedicinesComponent,
    children: [
      { path: 'list', component: ListMedicinesComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'new', component: NewMedicineComponent },
    ],
  },
  {
    path: 'admin/staffs',
    component: StaffsComponent,
    children: [
      { path: 'list', component: ListStaffsComponent },
      { path: 'edit', component: NewStaffComponent },
      { path: 'edit/:staffId', component: NewStaffComponent },
    ],
  },
  { path: 'doctor/home', component: DoctorComponent },
  { path: 'doctor/advice', component: AdviceComponent },
  { path: 'doctor/advice/diagnosis', component: DiagnosisComponent },
  { path: 'doctor/advice/vitals', component:VitalsComponent},
  { path: 'doctor/advice/medicine', component:MedicineComponent},
  { path: 'doctor/advice/tests', component:TestsComponent},
  { path: 'lab/home', component:LabTechnicianComponent},
  { path: 'lab/home/test', component:LabTestReportComponent},
  { path: 'pharmacist', component: PharmacistComponent },
  {path:'pharmacy/home',component:HomeComponent},
  {path:'pharmacy/reports',component:ReportMedicineComponent},
  { path: 'lab/home/billing', component:BillingComponent},
  { path: 'doctor/app', component:AppointmentsComponent},
  { path: '**', component: AppComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
