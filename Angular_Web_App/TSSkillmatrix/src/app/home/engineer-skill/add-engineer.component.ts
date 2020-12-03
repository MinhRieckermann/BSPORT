import { MachineSkillAssign } from "./../../shared/ViewModels/MachineSKillAssign.model";
import { MachineSkill } from "./../../shared/models/MachineSkill.model";
import { Maker } from "./../../shared/models/maker.model";
import { Industry } from "./../../shared/models/Industry.model";
import { Technician } from "./../../shared/models/technician.model";
import { TechnicianService } from "./../../shared/services/technicianservice.service";
import { ProfessionalSkill } from "./../../shared/models/ProfessionalSkill.model";
import { Observable } from "rxjs";
import { OnInit, Component } from "@angular/core";
import { SkillService } from "../../shared/services/skillservice.service";
import { Router } from "@angular/router";
import { AppSettings } from "../../shared/constant/TSconstands.component";
import { HttpErrorResponse } from "@angular/common/http";
import {
  debounceTime,
  finalize,
  mergeMap,
  switchMap,
  tap,
} from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { TypeaheadMatch } from "ngx-bootstrap";
import { TechMachineIndutry } from "../../shared/models/techmachineind.model";
import { ToastrService } from "ngx-toastr";
import { PrettyRadioChange } from "ngx-pretty-checkbox";
import { Stationed } from "../../shared/models/Stationed.model";
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
  PrimeNGConfig,
} from "primeng/api";
import { DialogService } from "../../shared/services/dialog.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ErrorStateMatcher } from "@angular/material/core";
import { TempMachineSkillAssign } from "../../shared/ViewModels/TempMachineSkillAssign.model";

@Component({
  selector: "app-engineer-skill",
  templateUrl: "./add-engineer.component.html",
  styleUrls: ["./add-engineer.component.css"],
})
export class AddTechSkillComponent implements OnInit {
  listIndustries: Array<Industry>;
  listEnIndustries: Array<Industry>;
  listStationed: Array<Stationed>;
  TechMachineIndutry: Array<TechMachineIndutry>;
  listProskill: Array<ProfessionalSkill>;
  listAssignmachine: Array<TempMachineSkillAssign>;
  selectedMachineAssignments = new TempMachineSkillAssign();
  listMachineSkill: Array<MachineSkill>;
  StationedSource: Observable<any>;
  userSource: Observable<any>;
  industrySource: Observable<any>;
  machinedustrySource: Observable<any>;
  asyncSelected: string;
  staasyncSelected: string;
  indasyncSelected: string;
  maasyncSelected: string;
  comment: string;
  model: string;
  typeaheadLoading: boolean;
  noResult = false;
  IndResult = false;
  StaResult = false;
  machineNoReuslt = false;
  secondFormGroup: FormGroup;
  technician: Technician;
  selectedRelMachine: Maker;
  userName: string;
  matcher = new MyErrorStateMatcher();
  isSelectMachine: boolean = false;
  sourceTechnicians = new Array<Technician>();

  targetTechnicians = new Array<Technician>();

  selectedTechnicians = new Array<Technician>();
  listImportEngineer = new Array<Technician>();
  listEngineer = new Array<Technician>();
  totalRecords: number;
  loading: boolean = false;
  first = 0;
  rows = 5;
  filterValue: string;
  isFitler: boolean = false;
  isSelectMaker: boolean = false;
  dataSource = new MatTableDataSource<MachineSkillAssign>();
  displayedColumns: string[] = ["name", "application", "comment", "action"];
  searchMachinesCtrl = new FormControl();
  filteredMachines: any;
  isLoading = false;
  selectedInd = new Industry();
  selectedMachine = new MachineSkillAssign();
  constructor(
    private toastr: ToastrService,
    private router: Router,
    public skillService: SkillService,
    public techService: TechnicianService,
    private spinner: NgxSpinnerService,
    private primengConfig: PrimeNGConfig,
    private dialogService: DialogService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit() {
    this.userName = localStorage.getItem("UserName");
    this.listProskill = new Array<ProfessionalSkill>();
    this.listIndustries = new Array<Industry>();
    this.listMachineSkill = new Array<MachineSkill>();
    this.technician = new Technician();
    this.targetTechnicians = new Array<Technician>();
    this.technician.ProSkill = 0;
    this.technician.listAssign = new Array<MachineSkillAssign>();
    this.listAssignmachine = new Array<TempMachineSkillAssign>();
    this.TechMachineIndutry = new Array<TechMachineIndutry>();
    this.selectedRelMachine = new Maker();
    this.primengConfig.ripple = true;
    this.selectedMachineAssignments.Maker = new Maker();
    this.selectedMachineAssignments.MachineSkill = new Array<MachineSkill>();
    this.selectedMachineAssignments.Technicians = new Array<Technician>();
    this.secondFormGroup = this._formBuilder.group({
      application: ["N/A", Validators.required],
      Description: ["", Validators.required],
    });
    this.selectedTechnicians = new Array<Technician>();
    this.GetlistEngineer(this.rows);

    this.searchMachinesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filteredMachines = [];
          this.isLoading = true;
        }),
        switchMap((value) =>
          this.skillService
            .SearchMachineMakerByIndustry(
              AppSettings.GetQuerySeach(
                10,
                1,
                value,
                null,
                this.selectedInd.IndId
              )
            )
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
        )
      )
      .subscribe((data) => {
        if (data == undefined) {
          this.filteredMachines = [];
        } else {
          this.filteredMachines = data;
        }
      });

    this.skillService
      .GetListIndustries(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listIndustries = data.objects;
          this.listEnIndustries = data.objects;
          this.technician.IndustryId = this.listEnIndustries[0].IndId;
          this.selectedInd.IndId = this.listIndustries[0].IndId;
        },
        (err: HttpErrorResponse) => {}
      );

    this.skillService
      .GetListMachineSKill(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listMachineSkill = data.objects;
        },
        (err: HttpErrorResponse) => {}
      );

    this.spinner.show();
    this.techService
      .GetListStationedEngineer(
        AppSettings.GetQuerySeach(50, 1, this.userName, 13)
      )
      .subscribe(
        (data: any) => {
          this.listStationed = data.objects;
          this.technician.StationId = this.listStationed[0].StationId;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

    this.skillService
      .GetListProskill(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listProskill = data.objects;
        },
        (err: HttpErrorResponse) => {}
      );

    //Get Source to search Initial
    this.userSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).pipe(
      mergeMap((token: string) =>
        this.techService.SearchUserInitialByCountry(
          AppSettings.GetQuerySeach(10, 1, token, null, 1, this.userName)
        )
      )
    );

    //Get Source to search maker name
    this.StationedSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.staasyncSelected);
    }).pipe(
      mergeMap((token: string) =>
        this.techService.SearchStationed(
          AppSettings.GetQuerySeach(10, 1, token)
        )
      )
    );

    //Get Source to search maker name
    this.industrySource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.indasyncSelected);
    }).pipe(
      mergeMap((token: string) =>
        this.skillService.SearchIndustry(
          AppSettings.GetQuerySeach(10, 1, token)
        )
      )
    );

    //Get Source to search maker name
    this.machinedustrySource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.maasyncSelected);
    }).pipe(
      mergeMap((token: string) =>
        this.skillService.SearchMachineMakerByIndustry(
          AppSettings.GetQuerySeach(10, 1, token, null, this.selectedInd.IndId)
        )
      )
    );
  }

  onRowSelect(event) {
    this.selectedMachineAssignments.Technicians.push(event.data);
    this.selectedTechnicians.push(event.data);
    this.messageService.add({
      severity: "info",
      summary: "Technician Selected",
      detail: event.data.DisplayName,
    });
  }

  onRowUnselect(event) {
    let tech = this.selectedMachineAssignments.Technicians.filter(
      (x) => x.UserName == event.data.UserName
    )[0];
    let tech2 = this.selectedTechnicians.filter(
      (x) => x.UserName == event.data.UserName
    )[0];

    this.selectedMachineAssignments.Technicians.splice(
      this.selectedMachineAssignments.Technicians.indexOf(tech, 1)
    );

    this.selectedTechnicians.splice(this.selectedTechnicians.indexOf(tech2, 1));

    this.messageService.add({
      severity: "info",
      summary: "Technician Unselected",
      detail: event.data.DisplayName,
    });
  }

  AddMaker() {
    this.listAssignmachine.push(this.selectedMachineAssignments);
    this.SubmitMachineAssign();
    this.ResetMachineAssignments();
    this.messageService.add({
      severity: "success",
      summary: "",
      detail: "Assign Machine Maker success",
    });
  }

  cancelAddMaker() {
    this.ResetMachineAssignments();
  }

  ResetMachineAssignments() {
    this.selectedMachineAssignments = new TempMachineSkillAssign();
    this.selectedMachineAssignments.Maker = new Maker();
    this.selectedMachineAssignments.MachineSkill = new Array<MachineSkill>();
    this.selectedMachineAssignments.Technicians = new Array<Technician>();
    this.selectedTechnicians = new Array<Technician>();
    this.isSelectMachine = false;
    this.isSelectMaker = false;

    this.searchMachinesCtrl.patchValue("");

    this.selectedRelMachine = new Maker();
    this.secondFormGroup = this._formBuilder.group({
      application: ["N/A", Validators.required],
      Description: ["", Validators.required],
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: "Are you sure that you want to perform this action?",
      accept: () => {
        this.spinner.show();
        this.techService
          .AddListTechnicianSkill(this.targetTechnicians)
          .subscribe(
            (data) => {
              this.spinner.hide();
              this.messageService.add({
                severity: "success",
                summary: "",
                detail: "Add List Technicians success",
              });
              this.router.navigate(["/home/list-engineer"]);
            },
            (err: HttpErrorResponse) => {
              this.spinner.hide();
            }
          );
        console.log(this.targetTechnicians);
      },
    });
  }

  OptionSelectChange(eve: MatCheckboxChange) {
    let number = parseInt(eve.source.value);
    let model = this.listMachineSkill.filter((x) => x.MSId == number)[0];
    if (eve.checked) {
      this.selectedMachineAssignments.MachineSkill.push(model);
      this.selectedMachineAssignments.SkillNumber += number;
    } else {
      let index = this.selectedMachineAssignments.MachineSkill.indexOf(model);
      this.selectedMachineAssignments.MachineSkill.splice(index, 1);
      this.selectedMachineAssignments.SkillNumber -= number;
    }
  }

  addOption(eve: MatAutocompleteSelectedEvent) {
    this.selectedMachineAssignments.Maker = eve.option.value;
  }

  SelectMaker() {
    this.isSelectMaker = true;
  }

  selectProduct(value: Technician) {
    this.dialogService
      .openAddSkillDialog(value)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.targetTechnicians.push(res);
          this.messageService.add({
            severity: "success",
            summary: "",
            detail: "Add Technician success",
          });
        } else {
        }
      });
  }

  disabledAddTechnician(value: Technician) {
    let tech = this.targetTechnicians.filter(
      (x) => x.UserName == value.UserName
    )[0];
    return tech == null ? false : true;
  }

  removeTechnician(value: Technician) {
    let tech = this.targetTechnicians.filter(
      (x) => x.UserName == value.UserName
    )[0];
    this.targetTechnicians.splice(this.targetTechnicians.indexOf(tech), 1);

    this.messageService.add({
      severity: "success",
      summary: "",
      detail: "Remove Technician success",
    });
  }

  removeMachineAssignments(value: MachineSkillAssign) {
    let machine = this.listAssignmachine.filter(
      (x) => x.RelTechId == value.RelTechId
    )[0];

    this.listAssignmachine.splice(this.listAssignmachine.indexOf(machine), 1);
    this.messageService.add({
      severity: "success",
      summary: "",
      detail: "Remove Machine success",
    });
  }

  selectTechnicianFromSource(event: Event) {
    console.log(event);
  }

  GetlistEngineer(pagesize) {
    this.techService
      .GetListEmployeeBasedOnCountry(
        AppSettings.GetQuerySeach(pagesize, 1, this.userName, 13, 1)
      )
      .subscribe(
        (data: any) => {
          this.sourceTechnicians = data.objects;
          this.totalRecords = data.totalItem;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

  displayFn(value: any | string): string | undefined {
    let displayValue: string;
    if (value == undefined || value == null) {
      displayValue == "";
    } else {
      displayValue = value.MakerName;
    }

    return displayValue;
  }

  onOptionsSelected(event) {
    this.selectedInd = event;
  }
  onOptionsIndSelected(event) {
    this.technician.IndustryId = event;
  }
  onOptionsStationSelected(event) {
    this.technician.StationId = event;
  }

  onChange(eve: any) {
    if (eve == "" || eve != this.selectedRelMachine.MakerName) {
      this.selectedRelMachine = new Maker();
    }
  }

  AddMachineSkill() {
    this.selectedMachineAssignments.RelTechId +=
      this.listAssignmachine.length + 1;
    this.selectedMachineAssignments.Maker.Model = this.secondFormGroup.get(
      "application"
    ).value;
    this.selectedMachineAssignments.Comment = this.secondFormGroup.get(
      "Description"
    ).value;

    //this.technician.listAssign.push(this.selectedMachineAssignments);
    this.isSelectMachine = true;
    //assignskill.Comment = "";
    this.selectedRelMachine = new Maker();
    this.maasyncSelected = "";
    //this.model = "";
  }

  ClearMachineSKill() {
    this.ResetMachineAssignments();
    this.isSelectMachine = false;
  }

  onTextChange(eve: any, item: MachineSkillAssign) {
    item.Comment = eve;
  }

  changeTypeaheadLoading(e: boolean): void {
    if (e) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
    this.typeaheadLoading = e;
  }

  RemoveMachineSkill(item: MachineSkillAssign) {
    this.technician.listAssign.splice(
      this.technician.listAssign.findIndex(
        (x) => x.Maker.RelMachineId == x.Maker.RelMachineId
      ),
      1
    );
  }

  SubmitMachineAssign() {
    this.targetTechnicians.forEach((x) => {
      x.listAssign = new Array<MachineSkillAssign>();
      let machines = this.listAssignmachine.filter(
        (t) => t.Technicians.filter((z) => z.UserName == x.UserName).length > 0
      );
      if (machines.length > 0) {
        machines.forEach((element) => {
          console.log(x.listAssign);
          console.log(x.listAssign.filter((sa) => sa.RelTechId).length);
          if (
            x.listAssign.filter((sa) => sa.RelTechId == element.RelTechId)
              .length < 1
          ) {
            let machine = new MachineSkillAssign();
            machine.MachineSkill = new Array<MachineSkill>();
            machine.Maker = new Maker();

            machine.SkillNumber = element.SkillNumber;
            machine.Comment = element.Comment;
            machine.Maker = element.Maker;
            machine.MachineSkill = element.MachineSkill;
            x.listAssign.push(machine);
          }
        });
      }
    });
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.technician = e.item;
    this.technician.StationId = this.listStationed[0].StationId;
    this.technician.IndustryId = this.listEnIndustries[0].IndId;
    this.technician.listAssign = new Array<MachineSkillAssign>();
  }

  indtypeaheadOnSelect(e: TypeaheadMatch): void {
    this.technician.IndustryId = e.item.IndId;
  }

  statypeaheadOnSelect(e: TypeaheadMatch): void {
    this.technician.StationId = e.item.StationId;
  }

  matypeaheadOnSelect(e: TypeaheadMatch): void {
    this.selectedRelMachine = e.item;
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }
  indtypeaheadNoResults(event: boolean): void {
    this.IndResult = event;
  }
  statypeaheadNoResults(event: boolean): void {
    this.StaResult = event;
  }

  matypeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  changeOps(event: PrettyRadioChange) {
    let number = parseInt(event.value);
    if (event.checked) {
      this.technician.ProSkill = this.technician.ProSkill + number;
    } else {
      this.technician.ProSkill = this.technician.ProSkill - number;
    }
  }

  onFilterChange(eve: any, model: MachineSkillAssign) {
    let checkexisted = this.technician.listAssign.filter(
      (x) => x.Maker.RelMachineId == model.Maker.RelMachineId
    )[0];
    if (checkexisted != null) {
      let value = eve.target.value;
      let number = parseInt(eve.target.value);
      if (eve.target.checked) {
        let machine = new MachineSkill();
        machine.MSId = value;
        checkexisted.MachineSkill.push(machine);
        checkexisted.SkillNumber = checkexisted.SkillNumber + number;
      } else {
        checkexisted.SkillNumber = checkexisted.SkillNumber - number;
        checkexisted.MachineSkill.splice(
          checkexisted.MachineSkill.findIndex((x) => x.MSId == value),
          1
        );
      }
      console.log(checkexisted.SkillNumber);
    }
  }

  SubmitEngineer() {
    this.spinner.show();
    let Userid = parseInt(localStorage.getItem("UserNo"));
    this.technician.UpdatedBy = Userid;
    this.techService.AddTechnicianSkill(this.technician).subscribe(
      (data: any) => {
        this.toastr.success("Add machine skill for technician success");
        this.spinner.hide();
        this.technician = new Technician();
        this.technician.listAssign = new Array<MachineSkillAssign>();
        this.asyncSelected = "";
        this.indasyncSelected = "";
        this.staasyncSelected = "";

        this.router.navigate(["home/engineer-detail/", data]);
      },
      (err: HttpErrorResponse) => {}
    );
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    this.first = event.first;
    this.rows = event.rows;

    if (this.targetTechnicians) {
      if (this.isFitler) {
        this.techService
          .SearchListEmployeeBasedOnCountry(
            AppSettings.GetQuerySeach(
              this.rows,
              this.first / this.rows + 1,
              this.filterValue,
              13,
              1,
              this.userName
            )
          )
          .subscribe(
            (data: any) => {
              this.sourceTechnicians = data.objects;
              this.totalRecords = data.totalItem;
              this.spinner.hide();
            },
            (err: HttpErrorResponse) => {
              this.spinner.hide();
            }
          );
      } else {
        this.techService
          .GetListEmployeeBasedOnCountry(
            AppSettings.GetQuerySeach(
              event.rows,
              event.first / event.rows + 1,
              this.userName,
              13,
              1
            )
          )
          .subscribe(
            (data: any) => {
              this.sourceTechnicians = data.objects;
              this.totalRecords = data.totalItem;
              this.spinner.hide();
            },
            (err: HttpErrorResponse) => {
              this.spinner.hide();
            }
          );
      }
    }
    this.loading = false;
  }

  CheckConditionToDelete(tech: Technician) {
    let flag = false;
    this.targetTechnicians.forEach((x) => {
      let machines = this.listAssignmachine.filter(
        (t) =>
          t.Technicians.filter((z) => z.UserName == tech.UserName).length > 0
      );
      if (machines.length > 0) {
        flag = true;
      }
    });
    return flag;
  }

  FilterByName(value: any) {
    this.rows = 5;
    this.first = 0;
    this.loading = true;
    this.filterValue = value;
    if (value === "") {
      this.isFitler = false;
      this.GetlistEngineer(this.rows);
    } else {
      this.isFitler = true;
      if (this.targetTechnicians) {
        this.techService
          .SearchListEmployeeBasedOnCountry(
            AppSettings.GetQuerySeach(
              this.rows,
              this.first / this.rows + 1,
              value,
              13,
              1,
              this.userName
            )
          )
          .subscribe(
            (data: any) => {
              this.sourceTechnicians = data.objects;
              this.totalRecords = data.totalItem;
              this.spinner.hide();
            },
            (err: HttpErrorResponse) => {
              this.spinner.hide();
            }
          );
      }
    }

    this.loading = false;
  }

  SubmitGeneral() {
    console.log(this.targetTechnicians);
  }

  trackByItems(index: number, item: MachineSkillAssign) {}

  ValidateSubmitEngineer() {
    let flag = false;
    if (this.technician.listAssign.length < 1) {
      flag = true;
    }
    return flag;
  }

  BackHome() {
    this.router.navigate(["/"]);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.untouched || control.touched)
    );
  }
}
