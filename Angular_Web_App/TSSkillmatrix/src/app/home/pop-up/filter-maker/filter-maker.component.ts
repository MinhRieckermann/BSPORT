import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MachinesMaker } from "./../../../shared/ViewModels/MachinesMaker.model";
import { OnInit, Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { SkillService } from "../../../shared/services/skillservice.service";
import { FilterModel } from "../../../shared/models/FilterModel.model";
import { Industry } from "../../../shared/models/Industry.model";
import { AppSettings } from "../../../shared/constant/TSconstands.component";
import { HttpErrorResponse } from "@angular/common/http";
import { TechnicianService } from "../../../shared/services/technicianservice.service";
import { NgxSpinnerService } from "ngx-spinner";
import { debounceTime, finalize, switchMap, tap } from "rxjs/operators";
import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { UserService } from "../../../shared/services/user.service";
import { MatListOption, MatSelectionListChange } from "@angular/material/list";
@Component({
  selector: "app-filter-maker",
  templateUrl: "./filter-maker.component.html",
  styleUrls: ["./filter-maker.component.css"],
})
export class FilterMakerComponent implements OnInit {
  filter: FilterModel;
  listIndustries: Array<Industry>;
  listIndustries1 = new Array<Industry>();
  listIndustries2 = new Array<Industry>();
  searchMoviesCtrl = new FormControl();
  filteredMovies: Array<MachinesMaker>;
  filteredOptions: Observable<MachinesMaker[]>;
  isLoading = false;
  errorMsg: string;
  value = "";
  selectedCategories: any[];

  selectedMachine = new MachinesMaker();
  constructor(
    private router: Router,
    public skillService: SkillService,
    public technicianService: TechnicianService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<FilterMakerComponent>
  ) {}
  ngOnInit() {
    this.listIndustries = new Array<Industry>();

    this.filter = new FilterModel();
    this.filteredMovies = new Array<MachinesMaker>();
    this.filter.professionals = new Array<number>();
    this.filter.machineSkills = new Array<number>();
    this.filter = this.data.model;
    this.spinner.show();

    this.skillService
      .GetListIndustriesAll(AppSettings.GetQuerySeach(20, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listIndustries = data.objects;
          this.listIndustries1 = this.listIndustries.slice(
            1,
            this.listIndustries.length / 2 + 1
          );
          this.listIndustries2 = this.listIndustries.filter(
            (x) => this.listIndustries1.indexOf(x) < 0
          );
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
    this.searchMoviesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredMovies = [];
          this.isLoading = true;
        }),
        switchMap((token: string) =>
          this.skillService
            .SearchMachineMaker(AppSettings.GetQuerySeach(10, 1, token))
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
        )
      )
      .subscribe((data: MachinesMaker[]) => {
        if (data == undefined) {
          this.filteredMovies = [];
        } else {
          this.errorMsg = "";
          this.filteredMovies = data;
        }
      });

    this.searchMoviesCtrl.setValue("Nancy");
  }

  UpdateListIndustry(event: MatSelectionListChange) {
    if (event.option.selected) {
      this.filter.listIndustry.push(event.option.value.IndId);
    } else {
      this.filter.listIndustry.splice(
        this.filter.listIndustry.indexOf(event.option.value.IndId),
        1
      );
    }
    this.userService.AddNewMakerFilter(this.filter);
  }

  IndustriesSelected(value: Industry) {
    return this.filter.listIndustry.indexOf(value.IndId) === -1 ? false : true;
  }

  displayFn(state) {
    return state.MakerName;
  }

  onOptionsSelected(event) {
    this.filter.Industry = event;
  }

  onOptionsStationSelected(event) {
    this.filter.Stationed = event;
  }

  save() {
    this.dialogRef.close(this.filter);
  }

  Logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}

export function forbiddenNamesValidator(Services: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const index = Services.findIndex((Service) => {
      return new RegExp("^" + Service.MakerName + "$").test(control.value);
    });
    return index < 0 ? { forbiddenNames: { value: control.value } } : null;
  };
}

export function RequireMatch(control: AbstractControl) {
  const selection: any = control.value;
  if (typeof selection === "string") {
    return { incorrect: true };
  }
  return null;
}
