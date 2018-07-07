import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {ConfigService} from './config/config.service';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent
  ],
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent
  ],
  providers: [
    ConfigService
  ]
})
export class CommonModule { }
