import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './Layout/admin-layout/admin-layout.component';
import { FrontLayoutComponent } from './Layout/front-layout/front-layout.component';
import { LoginLayoutComponent } from './Layout/login-layout/login-layout.component';
import { ComponentsModule } from './components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DirectivesModule } from './shared/directives/directives.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertComponentComponent } from './shared/component/alert-component/alert-component.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    FrontLayoutComponent,
    LoginLayoutComponent,
    AlertComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ComponentsModule,
    MatIconModule,
    BrowserAnimationsModule,
    DirectivesModule,
    NgxPaginationModule
  ],
  providers: [DatePipe, { provide: LocationStrategy, useClass: HashLocationStrategy },],
  bootstrap: [AppComponent]
})
export class AppModule { }
