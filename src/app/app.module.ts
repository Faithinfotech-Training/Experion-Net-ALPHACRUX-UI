import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './reception/home-page/home-page.component';
import { PaymentsComponent } from './reception/payments/payments.component';
import { TransactionsComponent } from './reception/transactions/transactions.component';
import { RegisterPatientComponent } from './reception/register-patient/register-patient.component';
import { UpdatePatientComponent } from './reception/update-patient/update-patient.component';
import { ReceptionService } from './shared/reception.service';
import { ReceptionComponent } from './reception/reception.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { DoctorComponent } from './doctor/doctor.component';
import { AppointmentsComponent } from './doctor/appointments/appointments.component';
import { PatientListComponent } from './doctor/patient-list/patient-list.component';
import { AdviceComponent } from './doctor/advice/advice.component';
import { CommonModule } from '@angular/common';
import { UpdatePatientService } from './shared/update-patient.service';
import { DoctorAdviceService } from './shared/doctor-advice.service';
import { DiagnosisComponent } from './doctor/advice/diagnosis/diagnosis.component';
import { MedicineComponent } from './doctor/advice/medicine/medicine.component';
import { TestsComponent } from './doctor/advice/tests/tests.component';
import { LabTechnicianComponent } from './lab-technician/lab-technician.component';
import { LabTestReportComponent } from './lab-technician/lab-test-report/lab-test-report.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StaffsComponent } from './administrator/staffs/staffs.component';
import { MedicinesComponent } from './administrator/medicines/medicines.component';
import { NewStaffComponent } from './administrator/staffs/new-staff/new-staff.component';
import { ListStaffsComponent } from './administrator/staffs/list-staffs/list-staffs.component';





@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PaymentsComponent,
    TransactionsComponent,
    RegisterPatientComponent,
    UpdatePatientComponent,
    ReceptionComponent,
    DoctorComponent,
    AppointmentsComponent,
    PatientListComponent,
    AdviceComponent,
    DiagnosisComponent,
    MedicineComponent,
    TestsComponent,
    LabTechnicianComponent,
    LabTestReportComponent,
    AdministratorComponent,
    StaffsComponent,
    MedicinesComponent,
    NewStaffComponent,
    ListStaffsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CommonModule,
    NgbModule,
    
  ],
  providers: [ReceptionService,UpdatePatientService,DoctorAdviceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
