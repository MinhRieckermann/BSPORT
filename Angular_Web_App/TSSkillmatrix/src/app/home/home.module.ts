import { UpdateRegisterDetailComponent } from './pop-up/update-regdetail/update-regdetail.component';
import { AppRoutingModule } from "./../app-routing.module";
import { FilterComponent } from "./pop-up/filter/filter.component";
import { ListEngineerComponent } from "./list-engineers/list-engineer.component";
import { MachineMakerComponent } from "./machine-maker/machine-maker.component";
import { ExplainationComponent } from "./skillexplaination/explaination.component";
import { AuthGuard } from "./../auth/auth.guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { TypeaheadModule, TooltipModule, ModalModule } from "ngx-bootstrap";
import { PaginationModule } from "ngx-bootstrap";
import { AddTechSkillComponent } from "./engineer-skill/add-engineer.component";
import { NgxPrettyCheckboxModule } from "ngx-pretty-checkbox";
import { ToastrModule } from "ngx-toastr";
import { EngineerDetailsComponent } from "./engineer-detail/engineer-detail.component";
import { UpdateTechSkillComponent } from "./update-engineer/update-engineer.component";
import { MaterialModule } from "../shared/materials/material-module";
import { ConfirmationDialogComponent } from "./pop-up/confirmation/confirmation.component";
import { BrowserModule } from "@angular/platform-browser";
import { ListboxModule } from "primeng/listbox";
import { FilterMakerComponent } from "./pop-up/filter-maker/filter-maker.component";
import { DownloadMachineDialogComponent } from "./pop-up/download-machine/download-machine.component";
import { RegisterComponent } from "./register/register.component";
import { PrimeModule } from "../shared/ng-prime/prime.module";
import { RegisterDetailComponent } from "../login/reg-detail/reg-detail.component";
import { ListRegisterComponent } from "./list-register/list-register.component";
import { AddProSKillDialogComponent } from './pop-up/add-proskill/add-proskill.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "list-engineer",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "skill-explaination",
        component: ExplainationComponent,
      },
      {
        path: "machine-maker",
        component: MachineMakerComponent,
      },
      {
        path: "list-engineer",
        component: ListEngineerComponent,
      },
      {
        path: "list-register",
        component: ListRegisterComponent,
      },
      {
        path: "add-skill",
        component: AddTechSkillComponent,
      },
      {
        path: "engineer-detail/:id",
        component: EngineerDetailsComponent,
      },
      {
        path: "update-detail/:id",
        component: UpdateTechSkillComponent,
      },
    ],
  },
  {
    path: "",
    redirectTo: "home/dashboard",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    TypeaheadModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    NgxPrettyCheckboxModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ListboxModule,
    PrimeModule,

  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    ExplainationComponent,
    MachineMakerComponent,
    AddTechSkillComponent,
    ListEngineerComponent,
    EngineerDetailsComponent,
    UpdateTechSkillComponent,
    ConfirmationDialogComponent,
    FilterComponent,
    FilterMakerComponent,
    DownloadMachineDialogComponent,
    RegisterComponent,
    ListRegisterComponent,
    UpdateRegisterDetailComponent,
    AddProSKillDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    FilterComponent,
    FilterMakerComponent,
    DownloadMachineDialogComponent,
    UpdateRegisterDetailComponent,
    AddProSKillDialogComponent
  ],
})
export class HomeModule {}
