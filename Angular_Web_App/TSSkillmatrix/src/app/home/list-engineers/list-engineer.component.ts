import { filter, mergeMap } from "rxjs/operators";
import { Stationed } from "./../../shared/models/Stationed.model";
import { FilterModel } from "./../../shared/models/FilterModel.model";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { SkillService } from "../../shared/services/skillservice.service";
import { TechnicianService } from "../../shared/services/technicianservice.service";
import { Technician } from "../../shared/models/technician.model";
import { AppSettings } from "../../shared/constant/TSconstands.component";
import { HttpErrorResponse } from "@angular/common/http";
import { ProfessionalSkill } from "../../shared/models/ProfessionalSkill.model";
import { Industry } from "../../shared/models/Industry.model";
import { MachineSkill } from "../../shared/models/MachineSkill.model";
import { PrettyCheckBoxChange } from "ngx-pretty-checkbox";
import { Observable } from "rxjs";
import { TypeaheadMatch, BsModalService, BsModalRef } from "ngx-bootstrap";
import { DialogService } from "../../shared/services/dialog.service";
import { UserService } from "../../shared/services/user.service";
import * as FileSaver from "file-saver";
import { FormControl } from "@angular/forms";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { LazyLoadEvent } from "primeng/api";
import { Table } from "primeng/table";
import { SelectItem } from "primeng/api";

@Component({
  selector: "app-list-engineer",
  templateUrl: "./list-engineer.component.html",
  styleUrls: ["./list-engineer.component.css"],
  animations: [
    trigger("rowExpansionTrigger", [
      state(
        "void",
        style({
          transform: "translateX(-10%)",
          opacity: 0,
        })
      ),
      state(
        "active",
        style({
          transform: "translateX(0)",
          opacity: 1,
        })
      ),
      transition("* <=> *", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")),
    ]),
  ],
})
export class ListEngineerComponent implements OnInit {
  listEngineer: Array<Technician>;
  totalItem: number;
  currentPage: number = 1;
  filter: FilterModel;
  listIndustries: Array<Industry>;
  listProskill: Array<ProfessionalSkill>;
  listMachineSkill: Array<MachineSkill>;
  selectedProskill: Array<ProfessionalSkill>;
  selectedMachineSkill: Array<MachineSkill>;
  listStationed: Array<Stationed>;
  selectedInd: number;
  selectedSta: number;
  asyncSelected: string;
  machineDataSource: Observable<any>;
  machineasyncSelected: string;
  typeaheadLoading: boolean;
  noResult = false;
  userName: string;
  canEdit: boolean = false;
  isFilter: boolean = false;
  isClear: boolean = false;
  totalRecords: number;
  loading: boolean = false;
  first = 0;
  rows = 10;
  datasource = new Array<Technician>();
  items: SelectItem[];
  value = "Clear me";
  selected = "1";
  disableSelect = new FormControl(false);
  modalRef: BsModalRef;
  selectedCities: string[] = [];
  @ViewChild("dt") table: Table;
  config = {
    animated: true,
  };

  texts: string[];

  results2: string[];

  selectedStation: string[] = [];

  selectedMachine: string[] = [];

  item: string;

  results: any;
  constructor(
    private dialogService: DialogService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public skillService: SkillService,
    public technicianService: TechnicianService,
    public userService: UserService
  ) {}
  ngOnInit() {
    this.loading = true;
    this.items = [];
    this.userName = localStorage.getItem("UserName");
    this.listProskill = new Array<ProfessionalSkill>();
    this.selectedProskill = new Array<ProfessionalSkill>();
    this.listIndustries = new Array<Industry>();
    this.listMachineSkill = new Array<MachineSkill>();
    this.selectedMachineSkill = new Array<MachineSkill>();
    this.listEngineer = new Array<Technician>();
    this.listStationed = new Array<Stationed>();
    this.filter = new FilterModel();
    this.filter.professionals = new Array<number>();
    this.filter.machineSkills = new Array<number>();
    this.filter.pagenumber = 1;
    this.filter.pagesize = 10;

    this.technicianService
      .GetListEngineer(
        AppSettings.GetQuerySeach(10, 1, "", 13, parseInt(this.selected))
      )
      .subscribe(
        (data: any) => {
          this.datasource = data.objects;
          this.totalItem = data.totalItem;
          this.totalRecords = data.totalItem;
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
        }
      );

    this.skillService
      .CheckPermission(AppSettings.GetQuerySeach(10, 1, this.userName, 13))
      .subscribe(
        (data: any) => {
          this.canEdit = data;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

    this.spinner.show();
    this.skillService
      .GetListIndustriesAll(AppSettings.GetQuerySeach(20, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listIndustries = data.objects;
          this.selectedInd = this.listIndustries[0].IndId;
          this.filter.Industry = this.listIndustries[0].IndId;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

    this.spinner.show();
    this.technicianService
      .GetListStationedAll(AppSettings.GetQuerySeach(50, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listStationed = data.objects;
          this.selectedSta = this.listStationed[0].StationId;
          this.filter.Stationed = this.listStationed[0].StationId;
          this.GetFilterStationCondition();
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
          this.GetFilterMachineSkillCondition();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

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

  loadCustomers(event: LazyLoadEvent) {
    this.first = event.first;
    this.rows = event.rows;
    if (this.datasource) {
      if (this.isFilter) {
        this.userService.ChangePageNumber(event.first / event.rows + 1);
        this.userService.ChangePageSizeNumber(event.rows);
        this.openFilerModal();
      } else {
        this.loading = true;
        this.technicianService
          .GetListEngineer(
            AppSettings.GetQuerySeach(
              event.rows,
              event.first / event.rows + 1,
              "",
              13,
              parseInt(this.selected)
            )
          )
          .subscribe(
            (data: any) => {
              this.listEngineer = data.objects;
              this.totalItem = data.totalItem;
              this.totalRecords = data.totalItem;
              this.loading = false;
            },
            (err: HttpErrorResponse) => {
              this.loading = false;
            }
          );
      }
    }
  }

  onRepresentativeChange(event) {
    this.first = 0;
    this.userService.ChangePageNumber(this.first / this.rows + 1);
    this.userService.ChangePageSizeNumber(this.rows);
    let value = 0;
    if (event.value.length > 0) {
      event.value.forEach((x) => {
        value += x.SkillId;
      });
    }

    this.userService.AddNewProskillList(value);
    this.openFilerModal();
  }

  onCountryChange(event) {
    this.first = 0;
    this.userService.ChangePageNumber(this.first / this.rows + 1);
    this.userService.ChangePageSizeNumber(this.rows);
    if (event.value.length > 0) {
      let numbers = new Array<number>();
      event.value.forEach((x) => {
        numbers.push(x.StationId);
      });
      this.userService.AddStationList(numbers);
    } else {
      let numbers = new Array<number>();
      this.userService.AddStationList(numbers);
    }
    this.openFilerModal();
  }

  onMachineSkillChange(event) {
    this.first = 0;
    this.userService.ChangePageNumber(this.first / this.rows + 1);
    this.userService.ChangePageSizeNumber(this.rows);
    let value = 0;
    if (event.value.length > 0) {
      event.value.forEach((x) => {
        value += x.MSId;
      });
    }
    this.userService.AddNewMachineList(value);
    this.openFilerModal();
  }

  GetlistEngineer() {
    this.technicianService
      .GetListEngineer(
        AppSettings.GetQuerySeach(
          this.rows,
          this.first / this.rows + 1,
          "",
          13,
          parseInt(this.selected)
        )
      )
      .subscribe(
        (data: any) => {
          this.listEngineer = data.objects;
          this.totalItem = data.totalItem;
          this.totalRecords = data.totalItem;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

  GetFilterStationCondition() {
    let filterCondition = this.userService.getMakerFilter();

    if (filterCondition.listStationed.length > 0) {
      filterCondition.listStationed.forEach((element) => {
        if (
          this.listStationed.filter((x) => x.StationId == element)[0] != null
        ) {
          this.selectedStation.push(
            this.listStationed.filter((x) => x.StationId == element)[0]
              .StationName
          );
        }
      });
    }
  }

  GetFilterMachineSkillCondition() {
    let filterCondition = this.userService.getMakerFilter();

    if (filterCondition.machineSkillNumber > 0) {
      this.listMachineSkill.forEach((element) => {
        if ((element.MSId & filterCondition.machineSkillNumber) != 0) {
          this.selectedMachine.push(element.Explain);
        }
      });
    }
  }

  search(event) {
    this.technicianService
      .SearchTechnicianByName(AppSettings.GetQuerySeach(10, 1, event.query))
      .subscribe((data) => {
        this.results = data;
      });
  }

  ExportListEngineers() {
    let currentdate = new Date();
    let url =
      "http://xcasrvmds001/ReportServer/Pages/ReportViewer.aspx?/LODReport/TSSkillMatrix/rptTechnician&rs:Format=EXCELOPENXML&rs:ClearSession=True&Time=" +
      currentdate.getDate().toString() +
      (currentdate.getMonth() + 1).toString() +
      currentdate.getFullYear().toString() +
      currentdate.getMilliseconds().toString();

    this.spinner.show();
    this.technicianService
      .DownloadTechniciansReport(AppSettings.GetQuerySeach(10, 1, url, 13))
      .subscribe(
        (blob) => {
          FileSaver.saveAs(blob, "Technician-skills-matrix" + ".xlsx");

          this.spinner.hide();
        },
        (error) => {
          console.log("Something went wrong");
          this.spinner.hide();
        }
      );
  }

  openFilerModal() {
    this.loading = true;
    this.filter = this.userService.getTechFilter();
    this.selected = "1";
    this.technicianService.FilterListEngineer(this.filter).subscribe(
      (data: any) => {
        if (data.objects !== null) {
          this.listEngineer = data.objects;
          this.totalItem = data.totalItem;
          this.totalRecords = data.totalItem;
        } else {
          this.listEngineer = new Array<Technician>();
          this.totalItem = 0;
          this.totalRecords = 0;
        }

        this.isClear = true;
        this.isFilter = true;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    if (e) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.router.navigate(["home/engineer-detail/", e.item.TechId]);
  }

  onChange(eve: any) {
    if (eve == "") {
      //Get list Machine maker
      this.technicianService
        .GetListEngineer(AppSettings.GetQuerySeach(10, 1, "", 13))
        .subscribe(
          (data: any) => {
            this.listEngineer = data.objects;
            this.totalItem = data.totalItem;
            this.spinner.hide();
          },
          (err: HttpErrorResponse) => {
            this.spinner.hide();
          }
        );
    }
  }

  typeaheadNoResults(event: boolean): void {
    this.noResult = event;
  }

  gotoAddEngineer() {
    this.router.navigate(["home/add-skill"]);
  }

  ClearFilter() {
    this.rows = 10;
    this.first = 0;
    this.spinner.show();
    this.userService.ResetFilter();
    this.selected = "1";
    this.technicianService
      .GetListEngineer(
        AppSettings.GetQuerySeach(10, 1, "", 13, parseInt(this.selected))
      )
      .subscribe(
        (data: any) => {
          this.listEngineer = data.objects;
          this.totalRecords = data.totalItem;
          this.isClear = false;
          this.isFilter = false;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

  onSelect(event: any) {
    this.router.navigate(["/home/engineer-detail/", event.TechId]);
  }

  changeTypeaheadMachineLoading(e: boolean): void {
    if (e) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
    this.typeaheadLoading = e;
  }

  typeaheadMachineOnSelect(e: TypeaheadMatch): void {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  BackHome() {
    this.router.navigate(["/"]);
  }
}
