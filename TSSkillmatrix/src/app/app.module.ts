import { DialogService } from "./shared/services/dialog.service";
import { TechnicianService } from "./shared/services/technicianservice.service";
import { appRoutes } from "./routes";
import { SkillService } from "./shared/services/skillservice.service";
import { LoginModule } from "./login/login.module";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { UserService } from "./shared/services/user.service";
import { AuthService } from "./shared/services/authService.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { GeneralPageNotFoundComponent } from "./home/pagenotfound/pagenotfound.component";
import { HomeModule } from "./home/home.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPrettyCheckboxModule } from "ngx-pretty-checkbox";
import { MaterialModule } from "./shared/materials/material-module";
import { RegisterComponent } from './app/register/register.component';

@NgModule({
  declarations: [AppComponent, GeneralPageNotFoundComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    LoginModule,
    HomeModule,
    RouterModule.forRoot(appRoutes),
    NgxSpinnerModule,
    NgxPrettyCheckboxModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    UserService,
    SkillService,
    TechnicianService,
    AuthGuard,
    DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
