import { DialogService } from "./../../shared/services/dialog.service";
import { mergeMap } from "rxjs/operators";
import { Industry } from "./../../shared/models/Industry.model";
import { MachinesMaker } from "./../../shared/ViewModels/MachinesMaker.model";
import { JsonMachineMaker } from "./../../shared/ViewModels/JsonMachineMaker.model";
import { Router } from "@angular/router";
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { SkillService } from "../../shared/services/skillservice.service";
import { AppSettings } from "../../shared/constant/TSconstands.component";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, of } from "rxjs";
import { TypeaheadMatch, BsModalRef, BsModalService } from "ngx-bootstrap";
import { PrettyCheckBoxChange } from "ngx-pretty-checkbox";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-machinemaker",
  templateUrl: "./machine-maker.component.html",
  styleUrls: ["./machine-maker.component.css"],
})
export class MachineMakerComponent implements OnInit {
  modalRef: BsModalRef;
  listIndustries1: Array<Industry>;
  listIndustries2: Array<Industry>;
  listIndustriesUpdate1: Array<Industry>;
  listIndustriesUpdate2: Array<Industry>;
  jsonIndustry: Array<JsonMachineMaker>;
  listMachineMaker: MachinesMaker;
  dataSource: Observable<any>;
  asyncSelected: string;
  userName: string;
  canEdit: boolean = false;
  typeaheadLoading: boolean;
  noResult = false;
  totalItem: number;
  currentPage: number = 1;
  selectedMaker: MachinesMaker;
  listIndustry: Array<Industry>;
  constructor(
    private dialogService: DialogService,
    private toastr: ToastrService,
    private router: Router,
    public skillService: SkillService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private changeDetection: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.spinner.show();
    this.listIndustry = new Array<Industry>();
    this.listIndustries1 = new Array<Industry>();
    this.listIndustries2 = new Array<Industry>();
    this.listIndustriesUpdate1 = new Array<Industry>();
    this.listIndustriesUpdate2 = new Array<Industry>();
    this.jsonIndustry = new Array<JsonMachineMaker>();
    this.listMachineMaker = new MachinesMaker();
    this.selectedMaker = new MachinesMaker();
    this.listMachineMaker.industries = new Array<Industry>();
    this.userName = localStorage.getItem("UserName");

    // Get list Industry
    this.skillService
      .GetListIndustries(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          let count = 1;
          this.listIndustry = data.objects;

          data.objects.forEach((object) => {
            if (count <= 6) {
              this.listIndustries1.push(object);
              this.listIndustriesUpdate1.push(object);
            } else {
              this.listIndustries2.push(object);
              this.listIndustriesUpdate2.push(object);
            }
            count = count + 1;
          });
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

    //Get list Machine maker
    this.skillService
      .GetListIndustriesMachine(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.jsonIndustry = data.objects;
          this.totalItem = data.totalItem;

          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

    //Get Source to search maker name
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).pipe(
      mergeMap((token: string) =>
        this.skillService.SearchMachineMaker(
          AppSettings.GetQuerySeach(10, 1, token)
        )
      )
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
    this.spinner.show();
    this.skillService
      .GetListIndustriesMachineByKey(
        AppSettings.GetQuerySeach(10, 1, "", e.item.MaId)
      )
      .subscribe(
        (data: any) => {
          this.jsonIndustry = data.objects;
          this.totalItem = data.totalItem;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

  openConfirmDeleteMachineMaker(makerId: number) {
    this.dialogService
      .openConfirmDialog("Are you sure want to delete Maker ?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.spinner.show();
          this.skillService
            .DeleteMaker(AppSettings.GetQuerySeach(10, 1, "", makerId))
            .subscribe(
              (data: any) => {
                //Get list Machine maker
                this.toastr.success("Delete maker success");
                this.skillService
                  .GetListIndustriesMachine(
                    AppSettings.GetQuerySeach(10, 1, "", 13)
                  )
                  .subscribe(
                    (data: any) => {
                      this.jsonIndustry = data.objects;
                      this.totalItem = data.totalItem;
                      this.spinner.hide();
                    },
                    (err: HttpErrorResponse) => {
                      this.spinner.hide();
                    }
                  );
              },
              (err: HttpErrorResponse) => {
                this.spinner.hide();
                this.toastr.error(err.error);
              }
            );
        }
      });
  }

  onChange(eve: any) {
    if (eve == "") {
      //Get list Machine maker
      this.skillService
        .GetListIndustriesMachine(AppSettings.GetQuerySeach(10, 1, "", 13))
        .subscribe(
          (data: any) => {
            this.jsonIndustry = data.objects;
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

  onSubmit() {
    this.spinner.show();

    this.skillService.AddMachineMaker(this.listMachineMaker).subscribe(
      (data: any) => {
        //Get list Machine maker
        this.skillService
          .GetListIndustriesMachine(AppSettings.GetQuerySeach(10, 1, "", 13))
          .subscribe(
            (data: any) => {
              this.jsonIndustry = data.objects;
              this.totalItem = data.totalItem;
              this.spinner.hide();
            },
            (err: HttpErrorResponse) => {
              this.spinner.hide();
            }
          );
        //end get list
      },
      (err: HttpErrorResponse) => {}
    );
  }

  UpdateMaker() {
    this.spinner.show();

    this.skillService.UpdateMakerIndustry(this.selectedMaker).subscribe(
      (data: any) => {
        //Get list Machine maker
        this.toastr.success("Update machine skill for technician success");
        this.skillService
          .GetListIndustriesMachine(AppSettings.GetQuerySeach(10, 1, "", 13))
          .subscribe(
            (data: any) => {
              this.jsonIndustry = data.objects;
              this.totalItem = data.totalItem;
              this.spinner.hide();
            },
            (err: HttpErrorResponse) => {
              this.spinner.hide();
            }
          );
        //end get list
        this.modalRef.hide();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastr.error(err.error);
      }
    );
  }

  openModal(template: TemplateRef<any>, makerId: number) {
    this.spinner.show();

    this.skillService
      .GetSelectedMachineMaker(AppSettings.GetQuerySeach(10, 1, "", makerId))
      .subscribe(
        (data: any) => {
          this.modalRef = this.modalService.show(template);
          this.selectedMaker = data;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

  CheckCondition(eve: any) {
    let number = this.selectedMaker.industries.findIndex((x) => x.IndId == eve);
    if (number != -1) {
      return true;
    } else {
      return false;
    }
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.skillService
      .GetListIndustriesMachine(
        AppSettings.GetQuerySeach(10, this.currentPage, "", 13)
      )
      .subscribe(
        (data: any) => {
          this.jsonIndustry = data.objects;
          this.totalItem = data.totalItem;

          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
  }

  changeSkillMachines(event: PrettyCheckBoxChange) {
    let id = parseInt(event.value);

    if (event.checked) {
      let industry = new Industry();
      industry.IndId = id;
      this.selectedMaker.industries.push(industry);
    } else {
      this.selectedMaker.industries.splice(
        this.selectedMaker.industries.findIndex((x) => x.IndId == id),
        1
      );
    }
  }

  BackHome() {
    this.router.navigate(["/"]);
  }

  onFilterChange(eve: any, model: Industry) {
    if (eve.target.checked) {
      this.listMachineMaker.industries.push(model);
    } else {
      this.listMachineMaker.industries.splice(
        this.listMachineMaker.industries.findIndex(
          (x) => x.IndId == model.IndId
        ),
        1
      );
    }
  }
}
