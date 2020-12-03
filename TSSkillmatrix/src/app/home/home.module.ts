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
  ],
  entryComponents: [ConfirmationDialogComponent, FilterComponent],
})
export class HomeModule {}
