import { Technician } from './../../shared/models/technician.model';
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
import { UserService } from "../../shared/services/user.service";
import { FilterModel } from "../../shared/models/FilterModel.model";
import * as FileSaver from "file-saver";
import { TechnicianService } from "../../shared/services/technicianservice.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MachineSkillAssign } from '../../shared/ViewModels/MachineSKillAssign.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: "app-list-register",
  templateUrl: "./list-register.component.html",
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ["./list-register.component.css"],
})
export class ListRegisterComponent implements OnInit {
  modalRef: BsModalRef;
  listIndustries1: Array<Industry>;
  listIndustries2: Array<Industry>;
  listIndustriesUpdate1: Array<Industry>;
  listIndustriesUpdate2: Array<Industry>;
  jsonIndustry: Array<JsonMachineMaker>;
  listMachineMaker: MachinesMaker;
  dataSource = new MatTableDataSource<Technician>();
  selection = new SelectionModel<Technician>(true, []);
  asyncSelected: string;
  userName: string;
  canEdit: boolean = false;
  typeaheadLoading: boolean;
  noResult = false;
  totalItem: number;
  currentPage: number = 1;
  selectedMaker: MachinesMaker;
  listIndustry: Array<Industry>;
  filter = new FilterModel();
  isFilter: boolean = false;
  expandedElement: MachineSkillAssign | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnsToDisplay: string[] = ['select','name', 'email', 'title', 'professional','machine','edit'];
  constructor(
    private dialogService: DialogService,
    private toastr: ToastrService,
    private router: Router,
    public skillService: SkillService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private changeDetection: ChangeDetectorRef,
    private userService: UserService,
    private technicianService: TechnicianService
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
    this.technicianService.GetListRegister(AppSettings.GetQuerySeach(10,1)).subscribe(
        (data: any) => {
          this.dataSource.data = data.objects;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.spinner.show();
    this.technicianService.SearchRegTechByName(AppSettings.GetQuerySeach(10, 1,filterValue)).subscribe((data: any) => {
        this.dataSource.data = data.objects;
        this.paginator.length = data.totalItem;
        this.spinner.hide();
      });

    
  }

  ConfirmAction(value : boolean){
        let msg =  value ? "Approve selection list ?" : "Reject selection list ?";
        this.dialogService.openConfirmDialog(msg).afterClosed().subscribe((res)=>{
            if(res){
                this.technicianService.ConfirmActionListRegister(this.selection.selected,value).subscribe((data)=>{
                    //Get list Machine maker
                    this.technicianService.GetListRegister(AppSettings.GetQuerySeach(10,1)).subscribe(
                        (data: any) => {
                        this.dataSource.data = data.objects;
                        this.spinner.hide();
                        },
                        (err: HttpErrorResponse) => {
                        this.spinner.hide();
                        }
                    );
                })
            }

        })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Technician): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.TechId + 1}`;
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

  openFilerModal() {
    this.filter = this.userService.getMakerFilter();
    this.dialogService
      .openFilterMachineMakerDialog(this.filter)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.filter = res;
          this.spinner.show();
          this.skillService.FilterListMakers(this.filter).subscribe(
            (data: any) => {
              this.jsonIndustry = data.objects;
              this.totalItem = data.totalItem;
              this.isFilter = true;
              this.spinner.hide();
            },
            (err: HttpErrorResponse) => {
              this.spinner.hide();
            }
          );
        }
      });
  }

  UpdateInformation(element : Technician){
        this.dialogService.openUpdateRegDigalog(element.UserName,element.UpdatedBy).afterClosed()
        .subscribe((res)=>{
            console.log(res);
            this.spinner.show();
            //Get list Machine maker
            this.technicianService.GetListRegister(AppSettings.GetQuerySeach(10,1)).subscribe(
                (data: any) => {
                    console.log( data.objects);
                this.dataSource.data = data.objects;
                this.spinner.hide();
                },
                (err: HttpErrorResponse) => {
                this.spinner.hide();
                }
            );
        })
  }


  OpenDownloadMachineReport(){
    let currentdate = new Date();
    

    this.dialogService.openDownloadMachineDialog().afterClosed()
    .subscribe((res) => {
      
      if (res) {
        console.log(res.data);
        let url = "http://xcasrvmds001/ReportServer/Pages/ReportViewer.aspx?/LODReport/TSSkillMatrix/rptMachineMaker"+
    "&IndustryID="
    +res.data.IndId+
    "&rs:Format=EXCELOPENXML&rs:ClearSession=True&Time="+
        currentdate.getDate().toString() +
        (currentdate.getMonth() + 1).toString() +
        currentdate.getFullYear().toString() +
        currentdate.getMilliseconds().toString();
        // this.spinner.show();
        // this.skillService
        // .DownloadMachinesReport(AppSettings.GetQuerySeach(10, 1, url, 13))
        // .subscribe(
        //   (blob) => {
        //     FileSaver.saveAs(blob, "Technician-skills-matrix" + ".xlsx");

        //     this.spinner.hide();
        //   },
        //   (error) => {
        //     console.log("Something went wrong");
        //     this.spinner.hide();
        //   }
        // );
        this.spinner.show();
        this.technicianService
        .DownloadTechniciansReport(AppSettings.GetQuerySeach(10, 1, url, 13))
        .subscribe(
          (blob) => {
            FileSaver.saveAs(blob, "Machine-maker" + ".xlsx");

            this.spinner.hide();
          },
          (error) => {
            console.log("Something went wrong");
            this.spinner.hide();
          }
        );
      }
      
    });
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
    this.userService.UpdatePageNumberOfMachine(this.currentPage);
    if (this.isFilter) {
      this.skillService.FilterListMakers(this.filter).subscribe(
        (data: any) => {
          this.jsonIndustry = data.objects;
          this.totalItem = data.totalItem;
          this.isFilter = true;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
    } else {
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

  ClearFilter() {
    this.isFilter = false;
    this.currentPage = 1;
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
