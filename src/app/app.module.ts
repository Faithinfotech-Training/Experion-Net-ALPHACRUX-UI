import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReceptionComponent } from './home/reception/reception.component';
import { HomePageComponent } from './home/reception/home-page/home-page.component';
import { AdministratorComponent } from './home/administrator/administrator.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReceptionComponent,
    HomePageComponent,
    AdministratorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
