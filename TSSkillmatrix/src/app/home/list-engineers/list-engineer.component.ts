import { filter, mergeMap } from "rxjs/operators";
import { Stationed } from "./../../shared/models/Stationed.model";
import { FilterModel } from "./../../shared/models/FilterModel.model";
import { Component, OnInit, TemplateRef } from "@angular/core";
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

@Component({
  selector: "app-list-engineer",
  templateUrl: "./list-engineer.component.html",
  styleUrls: ["./list-engineer.component.css"],
})
export class ListEngineerComponent implements OnInit {
  listEngineer: Array<Technician>;
  totalItem: number;
  currentPage: number = 1;
  filter: FilterModel;
  listIndustries: Array<Industry>;
  listProskill: Array<ProfessionalSkill>;
  listMachineSkill: Array<MachineSkill>;
  selectedProskill: Array<number>;
  selectedMachineSkill: Array<number>;
  listStationed: Array<Stationed>;
  selectedInd: number;
  selectedSta: number;
  dataSource: Observable<any>;
  asyncSelected: string;
  machineDataSource: Observable<any>;
  machineasyncSelected: string;
  typeaheadLoading: boolean;
  noResult = false;
  userName: string;
  canEdit: boolean = false;
  isClear: boolean = false;
  value = "Clear me";
  modalRef: BsModalRef;
  config = {
    animated: true,
  };
  constructor(
    private dialogService: DialogService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public skillService: SkillService,
    public technicianService: TechnicianService
  ) {}
  ngOnInit() {
    this.spinner.show();
    this.userName = localStorage.getItem("UserName");
    this.listProskill = new Array<ProfessionalSkill>();
    this.selectedProskill = new Array<number>();
    this.listIndustries = new Array<Industry>();
    this.listMachineSkill = new Array<MachineSkill>();
    this.selectedMachineSkill = new Array<number>();
    this.listEngineer = new Array<Technician>();
    this.listStationed = new Array<Stationed>();
    this.filter = new FilterModel();
    this.filter.professionals = new Array<number>();
    this.filter.machineSkills = new Array<number>();
    this.filter.pagenumber = 1;
    this.filter.pagesize = 10;
    this.technicianService
      .GetListEngineer(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listEngineer = data.objects;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
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
          this.selectedMachineSkill = data.objects;
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
          this.selectedProskill = data.objects;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).pipe(
      mergeMap((token: string) =>
        this.technicianService.SearchTechnicianByName(
          AppSettings.GetQuerySeach(10, 1, token)
        )
      )
    );

    this.machineDataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.machineasyncSelected);
    }).pipe(
      mergeMap((token: string) =>
        this.skillService.SearchMachineMaker(
          AppSettings.GetQuerySeach(10, 1, token)
        )
      )
    );
  }

  pageChanged(event: any): void {
    this.spinner.show();
    this.currentPage = event.page;
    this.technicianService
      .GetListEngineer(AppSettings.GetQuerySeach(10, event.page, "", 13))
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

  openFilerModal() {
    this.dialogService
      .openDiagnosedDialog(this.filter)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.filter = res;
          this.spinner.show();
          this.technicianService.FilterListEngineer(this.filter).subscribe(
            (data: any) => {
              this.listEngineer = data.objects;
              this.totalItem = data.totalItem;
              this.isClear = true;
              this.spinner.hide();
            },
            (err: HttpErrorResponse) => {
              this.spinner.hide();
            }
          );
        }
      });
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
  gotoAddEngineer() {
    this.router.navigate(["home/add-skill"]);
  }

  ClearFilter() {
    this.spinner.show();
    this.technicianService
      .GetListEngineer(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listEngineer = data.objects;
          this.isClear = false;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

  onOptionsSelected(event) {
    this.selectedInd = event;
    this.filter.Industry = event;
  }

  onOptionsStationSelected(event) {
    this.selectedSta = event;
    this.filter.Stationed = event;
  }

  SubmitFilter() {
    this.spinner.show();
    this.technicianService.FilterListEngineer(this.filter).subscribe(
      (data: any) => {
        this.listEngineer = data.objects;
        this.totalItem = data.totalItem;
        this.isClear = true;
        this.spinner.hide();
        this.filter = new FilterModel();
        this.filter.professionals = new Array<number>();
        this.filter.machineSkills = new Array<number>();
        this.filter.pagenumber = 1;
        this.filter.pagesize = 10;
        this.filter.Industry = this.listIndustries[0].IndId;
        this.filter.Stationed = this.listStationed[0].StationId;
        this.modalRef.hide();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
      }
    );
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
