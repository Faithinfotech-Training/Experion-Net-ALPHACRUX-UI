import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home/reception/home-page/home-page.component';
import { PaymentsComponent } from './home/reception/payments/payments.component';
import { TransactionsComponent } from './home/reception/transactions/transactions.component';
import { RegisterPatientComponent } from './home/reception/register-patient/register-patient.component';
import { UpdatePatientComponent } from './home/reception/update-patient/update-patient.component';
import { ReceptionService } from './shared/reception.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePageComponent,
    PaymentsComponent,
    TransactionsComponent,
    RegisterPatientComponent,
    UpdatePatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule
  ],
  providers: [ReceptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
