import { MachinesMaker } from "./../../../shared/ViewModels/MachinesMaker.model";
import { OnInit, Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { SkillService } from "../../../shared/services/skillservice.service";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatListOption,
  MatAutocompleteSelectedEvent,
} from "@angular/material";
import { FilterModel } from "../../../shared/models/FilterModel.model";
import { Industry } from "../../../shared/models/Industry.model";
import { ProfessionalSkill } from "../../../shared/models/ProfessionalSkill.model";
import { MachineSkill } from "../../../shared/models/MachineSkill.model";
import { Stationed } from "../../../shared/models/Stationed.model";
import { AppSettings } from "../../../shared/constant/TSconstands.component";
import { HttpErrorResponse } from "@angular/common/http";
import { TechnicianService } from "../../../shared/services/technicianservice.service";
import { NgxSpinnerService } from "ngx-spinner";
import { PrettyCheckBoxChange } from "ngx-pretty-checkbox";
import { debounceTime, finalize, switchMap, tap } from "rxjs/operators";
import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"],
})
export class FilterComponent implements OnInit {
  filter: FilterModel;
  listIndustries: Array<Industry>;
  listProskill: Array<ProfessionalSkill>;
  listMachineSkill: Array<MachineSkill>;
  listStationed: Array<Stationed>;
  machineSelection = new Array<MatListOption>();
  proskillSelection = new Array<MatListOption>();
  searchMoviesCtrl = new FormControl();
  filteredMovies: Array<MachinesMaker>;
  filteredOptions: Observable<MachinesMaker[]>;
  isLoading = false;
  errorMsg: string;
  value = "";
  selectedMachine = new MachinesMaker();
  constructor(
    private router: Router,
    public skillService: SkillService,
    public technicianService: TechnicianService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<FilterComponent>
  ) {}
  ngOnInit() {
    this.listProskill = new Array<ProfessionalSkill>();
    this.listIndustries = new Array<Industry>();
    this.listMachineSkill = new Array<MachineSkill>();
    this.listStationed = new Array<Stationed>();
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

    this.spinner.show();
    this.technicianService
      .GetListStationedAll(AppSettings.GetQuerySeach(50, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listStationed = data.objects;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

    this.spinner.show();
    this.skillService
      .GetListMachineSKill(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listMachineSkill = data.objects;
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
    if (this.filter.makerId != 0) {
      this.skillService
        .GetSelectedMachineMaker(
          AppSettings.GetQuerySeach(10, 1, "", this.filter.makerId)
        )
        .subscribe(
          (data: MachinesMaker[]) => {
            this.selectedMachine = data[0];
            this.filteredMovies = data;

            this.spinner.hide();
          },
          (err: HttpErrorResponse) => {
            this.spinner.hide();
          }
        );
    }

    this.spinner.show();
    this.skillService
      .GetListProskill(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listProskill = data.objects;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

  displayFn(state) {
    return state.MakerName;
  }

  optionSelected(model: MatAutocompleteSelectedEvent) {
    this.filter.makerId = model.option.value.MaId;
    this.selectedMachine = model.option.value;
  }

  onMachineSkillChanged(list) {
    this.machineSelection = list.selectedOptions.selected;
  }

  onProSkillChanged(list) {
    this.proskillSelection = list.selectedOptions.selected;
  }

  changeSkillMachines(event: PrettyCheckBoxChange) {
    let number = parseInt(event.value);
    if (event.checked) {
      this.filter.machineSkills.push(number);
      this.filter.machineSkillNumber += number;
    } else {
      this.filter.machineSkills.splice(
        this.filter.machineSkills.indexOf(
          this.filter.machineSkills.indexOf(number)
        ),
        1
      );
      this.filter.machineSkillNumber -= number;
    }
  }

  changeProskillMachines(event: PrettyCheckBoxChange) {
    let number = parseInt(event.value);
    if (event.checked) {
      this.filter.professionals.push(number);
      this.filter.professionalNumber += number;
    } else {
      this.filter.professionalNumber -= number;
      this.filter.professionals.splice(
        this.filter.professionals.indexOf(
          this.filter.professionals.indexOf(number)
        ),
        1
      );
    }
  }

  MachineIsSelected(value: MachineSkill) {
    return this.filter.machineSkills.indexOf(value.MSId) !== -1;
  }

  ProSkillIsSelected(value: ProfessionalSkill) {
    return this.filter.professionals.indexOf(value.SkillId) !== -1;
  }
  onOptionsSelected(event) {
    this.filter.Industry = event;
  }

  onOptionsStationSelected(event) {
    this.filter.Stationed = event;
  }

  save() {
    if (this.machineSelection.length > 0) {
      this.machineSelection.forEach((element) => {
        this.filter.machineSkills.push(element.value.MSId);
      });
    }

    if (this.proskillSelection.length > 0) {
      this.proskillSelection.forEach((element) => {
        this.filter.professionals.push(element.value.SkillId);
      });
    }
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
