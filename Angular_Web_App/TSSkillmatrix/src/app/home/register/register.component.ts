import { OnInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SkillService } from "../../shared/services/skillservice.service";
import { TechnicianService } from "../../shared/services/technicianservice.service";
import { AppSettings } from "../../shared/constant/TSconstands.component";
import {MenuItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ProfessionalSkill } from "../../shared/models/ProfessionalSkill.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Stationed } from "../../shared/models/Stationed.model";
import { MachineSkill } from "../../shared/models/MachineSkill.model";
import { Industry } from "../../shared/models/Industry.model";
import { debounceTime, finalize, startWith, switchMap, tap } from "rxjs/operators";
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MachineSkillAssign } from "../../shared/ViewModels/MachineSKillAssign.model";
import { Maker } from "../../shared/models/maker.model";
import { Observable } from "rxjs";
import { ErrorStateMatcher } from '@angular/material/core';
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Technician } from "../../shared/models/technician.model";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  providers: [MessageService],
  styleUrls: ["./register.component.css"],
})

export class RegisterComponent implements OnInit {
  isLinear = false;
  listAssignmachine= new Array<MachineSkillAssign>();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  searchMachinesCtrl = new FormControl();
  listProskill = new Array<ProfessionalSkill>();
  listStationed = new Array<Stationed>();
  listMachineSkill = new Array<MachineSkill>();
  activeIndex: number = 1;
  userName : string;
  listIndustries= new Array<Industry>();
  filteredMachines: any;
  selectedInd = new  Industry();
  selectedMachine = new MachineSkillAssign();
  isLoading = false;
  displayedColumns: string[] = ['name', 'application', 'comment', 'action'];
  technician = new Technician();
  matcher = new MyErrorStateMatcher();
  isSelectMaker : boolean = false;
  dataSource = new MatTableDataSource<MachineSkillAssign>();
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public skillService: SkillService,
    private techService: TechnicianService,
    private messageService: MessageService,
    private _formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.filteredMachines = [];
    this.userName = localStorage.getItem("UserName");
    this.dataSource.data = this.listAssignmachine;
    this.selectedMachine.Maker = new Maker();
    this.selectedMachine.MachineSkill = new Array<MachineSkill>();
    this.technician.ProSkill = 0;
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


    this.skillService
      .GetListProskill(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listProskill = data.objects;
        },
        (err: HttpErrorResponse) => {}
      );

      this.techService
      .GetListStationedEngineer(
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
      .GetListMachineSKill(AppSettings.GetQuerySeach(10, 1, "", 13))
      .subscribe(
        (data: any) => {
          this.listMachineSkill = data.objects;
        },
        (err: HttpErrorResponse) => {}
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
      this.technician.listAssign.push(this.selectedMachine);
       this.selectedMachine = new MachineSkillAssign();
       this.selectedMachine.Maker = new Maker();
       this.selectedMachine.MachineSkill = new Array<MachineSkill>();
       this.isSelectMaker = false;
       this.resetMachineAssignments();
       this.searchMachinesCtrl.setValue('');
      this.dataSource.data =  this.listAssignmachine;
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
    if (event.checked) {
      this.technician.ProSkill = this.technician.ProSkill + number;
    } else {
      this.technician.ProSkill = this.technician.ProSkill - number;
    }
  }

  addOption(eve : MatAutocompleteSelectedEvent){
      this.selectedMachine.Maker = eve.option.value;
  }
  RemoveMakerAction(model : MachineSkillAssign){

      let index = this.listAssignmachine.indexOf(model);
      if(index  != -1){
        this.listAssignmachine.splice(index,1);
      }
      this.dataSource.data =  this.listAssignmachine;
      console.log(this.listAssignmachine);
  }

  AddBasicInformation(){
    this.technician.DisplayName = this.firstFormGroup.get('FullName').value;
    this.technician.EmailAddress = this.firstFormGroup.get('Email').value;
    this.technician.Title = this.firstFormGroup.get('Title').value;
    this.technician.Remark = this.firstFormGroup.get('Remark').value;
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