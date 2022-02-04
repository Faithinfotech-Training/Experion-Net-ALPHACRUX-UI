import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
=======
import {HttpClientModule} from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';


>>>>>>> 944220f5eb422ef5be625cb5c8fa09ec75e2c3fb
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home/reception/home-page/home-page.component';
import { PaymentsComponent } from './home/reception/payments/payments.component';
import { TransactionsComponent } from './home/reception/transactions/transactions.component';
import { RegisterPatientComponent } from './home/reception/register-patient/register-patient.component';
import { UpdatePatientComponent } from './home/reception/update-patient/update-patient.component';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
