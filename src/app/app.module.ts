import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http'
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { FooterComponent } from './footer/footer.component';
import {SafeHtmlPipe} from "./pipes/safehtml.pipe";
import { ClientListComponent } from './client-list/client-list.component'; 
import {HttpService} from './http.service';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    FooterComponent,
    SafeHtmlPipe,
    ClientListComponent,
  ],
  imports: [
    ChartsModule,
    BrowserModule, AngularEditorModule, HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [HttpService, DatePipe,{ provide: LOCALE_ID, useValue: 'es-Ar' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
