import { OnInit, Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import {MessageService} from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";

import { HttpErrorResponse } from "@angular/common/http";

import { debounceTime, finalize, map, shareReplay, startWith, switchMap, tap } from "rxjs/operators";
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { Observable } from "rxjs";
import { ErrorStateMatcher } from '@angular/material/core';
import { MatCheckboxChange } from "@angular/material/checkbox";

import {MatTableDataSource} from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MachineSkillAssign } from "../../../shared/ViewModels/MachineSKillAssign.model";
import { Industry } from "../../../shared/models/Industry.model";
import { ProfessionalSkill } from "../../../shared/models/ProfessionalSkill.model";
import { Stationed } from "../../../shared/models/Stationed.model";
import { MachineSkill } from "../../../shared/models/MachineSkill.model";
import { Technician } from "../../../shared/models/technician.model";
import { SkillService } from "../../../shared/services/skillservice.service";
import { TechnicianService } from "../../../shared/services/technicianservice.service";
import { DialogService } from "../../../shared/services/dialog.service";
import { AppSettings } from "../../../shared/constant/TSconstands.component";
import { Maker } from "../../../shared/models/maker.model";
import { UserService } from "../../../shared/services/user.service";


@Component({
  selector: "app-update-register-detail",
  templateUrl: "./update-regdetail.component.html",
  providers: [MessageService],
  styleUrls: ["./update-regdetail.component.css"],
})

export class UpdateRegisterDetailComponent implements OnInit {

  isLinear = false;
  listAssignmachine= new Array<MachineSkillAssign>();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  searchMachinesCtrl = new FormControl();
  listProskill = new Array<ProfessionalSkill>();
  listTechProSKill = new Array<ProfessionalSkill>();
  listStationed = new Array<Stationed>();
  listMachineSkill = new Array<MachineSkill>();
  activeIndex: number = 1;
  userName : string;
  listIndustries= new Array<Industry>();
  filteredMachines: any;
  selectedInd = new  Industry();
  selectedMachine = new MachineSkillAssign();
  isLoading = false;
  displayedColumns: string[] = ['name', 'application', 'comment','skill' ,'action'];
  technician = new Technician();
  matcher = new MyErrorStateMatcher();
  isSelectMaker : boolean = false;
  selectedValue : number;
  dataSource = new MatTableDataSource<MachineSkillAssign>();
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public skillService: SkillService,
    private techService: TechnicianService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private dialogService: DialogService,
    private userService : UserService,
    private technicianService : TechnicianService,    
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<UpdateRegisterDetailComponent>
  ) {}
  ngOnInit() {
    
    this.filteredMachines = [];
    this.userName = this.data.username;
    this.dataSource.data = this.listAssignmachine;
    this.selectedMachine.Maker = new Maker();
    this.selectedMachine.MachineSkill = new Array<MachineSkill>();
    this.technician.ProSkill = 0;
    this.technician.Deactive = true;
    this.technician.listAssign = new Array<MachineSkillAssign>();
    this.searchMachinesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.filteredMachines = [];
          this.isLoading = true;
        }),
        switchMap(value =>  this.skillService.SearchMachineMakerByIndustry(
          AppSettings.GetQuerySeach(10, 1, value, null, this.selectedInd.IndId)
        )
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.filteredMachines = [];
        } else {
          this.filteredMachines = data;
        }
      });

      this.userService.GetRegEngineerDetail(AppSettings.GetQuerySeach(1,1,this.userName,)).subscribe((data:any)=>{     
        this.technician= data.objects;
        this.selectedValue = this.technician.StationId;
        this.listAssignmachine = this.technician.listAssign;
        this.dataSource.data = this.listAssignmachine;
        this.openLoginPop();
        this.spinner.hide();
      },
      (err : HttpErrorResponse)=>{
        this.spinner.hide();
      })

    this.skillService
      .GetListProskill(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listProskill = data.objects;
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

      this.techService
      .GetListStationedAll(
        AppSettings.GetQuerySeach(50, 1, this.userName, 13)
      )
      .subscribe(
        (data: any) => {
          this.listStationed = data.objects;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
        }
      );
      
      this.skillService
      .GetListIndustries(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listIndustries = data.objects;
          this.selectedInd = this.listIndustries[0];
        },
        (err: HttpErrorResponse) => {}
      );
      
      
      
    this.firstFormGroup = this._formBuilder.group({
      Country : ['', Validators.required],
      Email : ['',Validators.required],
      FullName : ['',Validators.required],
      Title : ['',Validators.required],
      Remark: ['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      application : ['N/A',Validators.required],
      Description : ['',Validators.required]
    });
  }

  CheckProSkills(value : number){
      return (value & this.technician.ProSkill) === 1 || (value & this.technician.ProSkill) === value ? true : false;
  }

  OptionSelectChange(eve: MatCheckboxChange){
    let number = parseInt(eve.source.value);
    if (eve.checked) {
      let model = this.listMachineSkill.filter(x=>x.MSId == number)[0];
      this.selectedMachine.MachineSkill.push(model);
      this.selectedMachine.SkillNumber += number;
    } else {
      let model = this.listMachineSkill.filter(x=>x.MSId == number)[0];
      let index = this.selectedMachine.MachineSkill.indexOf(model);
      this.selectedMachine.MachineSkill.splice(index,
        1
      );
      this.selectedMachine.SkillNumber -= number;
    }
  }

  openLoginPop(){
    this.firstFormGroup = this._formBuilder.group({
      Country : ['', Validators.required],
      Email : [this.technician.EmailAddress,Validators.required],
      FullName : [this.technician.DisplayName, Validators.required],
      Title : [this.technician.Title,Validators.required],
      Remark: [this.technician.Remark,Validators.required]
    });
  }

  displayFn(value: any | string): string | undefined {
    let displayValue: string;
    if(value == undefined || value == null) {
      displayValue == '';
    }else{
      displayValue = value.MakerName;
    }
    
    return displayValue;
  }

  AddMachineSkill() {
    
      this.selectedMachine.Maker.Model = this.secondFormGroup.get('application').value;
      this.selectedMachine.Comment = this.secondFormGroup.get('Description').value;

      this.listAssignmachine.push(this.selectedMachine);

       this.selectedMachine = new MachineSkillAssign();
       this.selectedMachine.Maker = new Maker();
       this.selectedMachine.MachineSkill = new Array<MachineSkill>();
       this.isSelectMaker = false;
       this.resetMachineAssignments();
       this.searchMachinesCtrl.setValue('');
      this.dataSource.data =  this.listAssignmachine;

      console.log(this.listAssignmachine);
  }

  cancelAdding(){
    this.selectedMachine = new MachineSkillAssign();
    this.selectedMachine.Maker = new Maker();
    this.selectedMachine.MachineSkill = new Array<MachineSkill>();
    this.resetMachineAssignments();
    this.isSelectMaker = false;
  }

  submitTechnician(){
    this.spinner.show();
    let Userid = parseInt(localStorage.getItem("UserNo"));
    this.technician.UpdatedBy = Userid;
    this.technician.listAssign = this.listAssignmachine;
    let technicians = new Array<Technician>();
    technicians.push(this.technician);

    this.technicianService.ConfirmActionListRegister(technicians,true).subscribe((data)=>{
        this.spinner.hide();
        this.technician = new Technician();
        this.technician.listAssign = new Array<MachineSkillAssign>();
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Update Information Success'});
    },
    (err: HttpErrorResponse) => {
        this.spinner.hide();
    }
    )
    this.dialogRef.close(true);
    
  }

  resetMachineAssignments(){
    this.secondFormGroup.reset();
    this.secondFormGroup = this._formBuilder.group({
      application : ['N/A',Validators.required],
      Description : ['',Validators.required]
    });
  }

  changeProfessionalSkillLevel(event : MatCheckboxChange) : void {
    let number = parseInt(event.source.value);
    let proskill = this.listProskill.filter(x=>x.SkillId == number)[0];

    if (event.checked) {
    this.listTechProSKill.push(proskill)
      this.technician.ProSkill = this.technician.ProSkill + number;
    } else {

        let index = this.listTechProSKill.indexOf(proskill);
        this.listTechProSKill.splice(index,
          1
        );
      this.technician.ProSkill = this.technician.ProSkill - number;
    }
   
  }

  addOption(eve : MatAutocompleteSelectedEvent){
      this.selectedMachine.Maker = eve.option.value;
  }
  RemoveMakerAction(model : MachineSkillAssign){

      let index = this.listAssignmachine.indexOf(model);
      let index2 = this.technician.listAssign.indexOf(model);

      if(index  != -1){
        this.listAssignmachine.splice(index,1);
      }

      if(index2 !=-1){
          this.technician.listAssign.splice(index2,1)
      }
      this.dataSource.data =  this.listAssignmachine;
      console.log(this.listAssignmachine);
  }

  AddBasicInformation(){
    this.technician.DisplayName = this.firstFormGroup.get('FullName').value;
    this.technician.EmailAddress = this.firstFormGroup.get('Email').value;
    this.technician.Title = this.firstFormGroup.get('Title').value;
    this.technician.Remark = this.firstFormGroup.get('Remark').value;
    this.technician.StationId = this.selectedValue;
    this.technician.StationName = this.listStationed.filter(x=>x.StationId == this.selectedValue)[0].StationName;
  }

  SelectMaker(){
    this.isSelectMaker = true; 
  }


  Logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(["/login"]);
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