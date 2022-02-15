import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './reception/home-page/home-page.component';
import { PaymentsComponent } from './reception/payments/payments.component';
import { TransactionsComponent } from './reception/transactions/transactions.component';
import { RegisterPatientComponent } from './reception/register-patient/register-patient.component';
import { UpdatePatientComponent } from './reception/update-patient/update-patient.component';
import { ReceptionService } from './shared/reception.service';
import { ReceptionComponent } from './reception/reception.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PaymentsComponent,
    TransactionsComponent,
    RegisterPatientComponent,
    UpdatePatientComponent,
    ReceptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [ReceptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
