
import { AccountService } from './modules/general/shared/services/account.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { AppRoutingModule } from './app-routing.module';
import { AlertService } from './modules/general/shared/services/alert.service';
import { AuthService } from './modules/general/shared/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './modules/general/auth/auth.interceptor';
import { AuthGuard } from './modules/general/auth/auth.guard';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AccountService,
    AlertService,
    AuthService,
    AuthGuard,
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
