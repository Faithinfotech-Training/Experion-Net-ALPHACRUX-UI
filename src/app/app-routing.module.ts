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
import { AppHomeComponent } from './app-home/app-home.component';
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
import { CanActivateGuard } from './shared/can-activate.guard';
import { ListComponent } from './pharmacist/list/list.component';

const routes: Routes = [
  {path:'',component:AppHomeComponent},
  { path: 'doctor/appointments', component: AppointmentsComponent,canActivate: [CanActivateGuard],data:{StaffId:'1'} },
  { path: 'login', component:LoginComponent},
  { path: 'doctor/advice', component: AdviceComponent,canActivate: [CanActivateGuard],data:{StaffId:'1'} },
  { path: 'reception/home', component: HomePageComponent},
  { path: 'reception/payments', component: PaymentsComponent  },
  { path: 'reception/register-patient', component: RegisterPatientComponent },
  { path: 'reception/transactions', component: TransactionsComponent},
  { path: 'reception/update-patient', component: UpdatePatientComponent},
  { path: 'admin', component: AdministratorComponent },

  {
    path: 'admin/medicine',
    component: MedicinesComponent,
    children: [
      { path: 'list', component: ListMedicinesComponent,canActivate: [CanActivateGuard],data:{StaffId:'10'}  },
      { path: 'inventory', component: InventoryComponent,canActivate: [CanActivateGuard],data:{StaffId:'10'}  },
      { path: 'new', component: NewMedicineComponent,canActivate: [CanActivateGuard],data:{StaffId:'10'}  },
    ],
  },
  {
    path: 'admin/staffs',
    component: StaffsComponent,
    children: [
      { path: 'list', component: ListStaffsComponent,canActivate: [CanActivateGuard],data:{StaffId:'10'}  },
      { path: 'edit', component: NewStaffComponent,canActivate: [CanActivateGuard],data:{StaffId:'10'} },
      { path: 'edit/:staffId', component: NewStaffComponent,canActivate: [CanActivateGuard],data:{StaffId:'10'}  },
    ],
  },
  { path: 'doctor/home', component: DoctorComponent,canActivate: [CanActivateGuard],data:{StaffId:'1'} },
  { path: 'doctor/advice', component: AdviceComponent,canActivate: [CanActivateGuard],data:{StaffId:'1'} },
  { path: 'doctor/advice/diagnosis', component: DiagnosisComponent,canActivate: [CanActivateGuard],data:{StaffId:'1'} },
  { path: 'doctor/advice/vitals', component:VitalsComponent,canActivate: [CanActivateGuard],data:{StaffId:'1'}},
  { path: 'doctor/advice/medicine', component:MedicineComponent,canActivate: [CanActivateGuard],data:{StaffId:'1'}},
  { path: 'doctor/advice/tests', component:TestsComponent,canActivate: [CanActivateGuard],data:{StaffId:'1'}},
  { path: 'lab/home', component:LabTechnicianComponent},
  { path: 'lab/home/test', component:LabTestReportComponent,canActivate: [CanActivateGuard],data:{StaffId:'8'}},
  { path: 'pharmacist', component: PharmacistComponent},

  {path:'pharmacy/meddata',component:ListComponent },
  {path:'pharmacy/home',component:HomeComponent },


  { path: 'lab/home/billing', component:BillingComponent,canActivate: [CanActivateGuard],data:{StaffId:'8'}},
  { path: 'login/doctor/app', component:AppointmentsComponent},
  //canActivate: [CanActivateGuard],data:{StaffId:'1'}},
  { path: '**', component: AppComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
