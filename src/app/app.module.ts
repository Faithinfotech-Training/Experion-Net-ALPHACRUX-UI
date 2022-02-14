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
import { HomePageComponent } from './reception/home-page/home-page.component';
import { PaymentsComponent } from './reception/payments/payments.component';
import { TransactionsComponent } from './reception/transactions/transactions.component';
import { RegisterPatientComponent } from './reception/register-patient/register-patient.component';
import { UpdatePatientComponent } from './reception/update-patient/update-patient.component';
import { ReceptionService } from './shared/reception.service';
import { ReceptionComponent } from './reception/reception.component';


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
    FormsModule
  ],
  providers: [ReceptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
