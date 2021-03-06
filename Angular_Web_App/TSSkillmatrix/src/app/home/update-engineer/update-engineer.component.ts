import { MachineSkillAssign } from './../../shared/ViewModels/MachineSKillAssign.model';
import { MachineSkill } from './../../shared/models/MachineSkill.model';
import { Maker } from './../../shared/models/maker.model';
import { Industry } from './../../shared/models/Industry.model';
import { Technician } from './../../shared/models/technician.model';
import { TechnicianService } from './../../shared/services/technicianservice.service';
import { ProfessionalSkill } from './../../shared/models/ProfessionalSkill.model';
import { Observable } from 'rxjs';
import { OnInit, Component } from "@angular/core";
import { SkillService } from "../../shared/services/skillservice.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AppSettings } from "../../shared/constant/TSconstands.component";
import { HttpErrorResponse } from "@angular/common/http";
import { mergeMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { TechMachineIndutry } from '../../shared/models/techmachineind.model';
import { ToastrService } from 'ngx-toastr';
import { PrettyRadioChange, PrettyCheckBoxChange } from 'ngx-pretty-checkbox';
import { Stationed } from '../../shared/models/Stationed.model';


@Component({
    selector: 'app-update-skill',
    templateUrl: './update-engineer.component.html',
    styleUrls: ['./update-engineer.component.css']
  })

  
export class UpdateTechSkillComponent implements OnInit {
    listIndustries :    Array<Industry>;
    listEnIndustries :    Array<Industry>;
    listStationed  : Array<Stationed>;
    TechMachineIndutry : Array<TechMachineIndutry>;
    listProskill   :    Array<ProfessionalSkill>;
    listAssignmachine : Array<MachineSkillAssign>;
    listMachineSkill : Array<MachineSkill>;
    StationedSource :   Observable<any>;
    userSource :        Observable<any>;
    industrySource:     Observable<any>;
    machinedustrySource: Observable<any>;
    asyncSelected       :string;
    staasyncSelected    :string;
    indasyncSelected    :string;
    maasyncSelected     :string;

    typeaheadLoading: boolean;
    noResult = false;
    IndResult = false;
    StaResult = false;
    machineNoReuslt=false;

    technician : Technician;
    selectedInd : number;
    userid:number;
    selectedRelMachine : Maker;
    userName :string;

  constructor(private toastr: ToastrService,private route: ActivatedRoute,private router: Router,public skillService : SkillService,public techService : TechnicianService,private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    this.userName = localStorage.getItem('UserName');
    this.listProskill = new Array<ProfessionalSkill>();
    this.listIndustries = new Array<Industry>();
    this.listMachineSkill = new Array<MachineSkill>();
    this.technician = new Technician();;
    this.technician.listAssign = new Array<MachineSkillAssign>();
    this.listAssignmachine = new Array<MachineSkillAssign>();
    this.TechMachineIndutry = new Array<TechMachineIndutry>();
    this.selectedRelMachine = new Maker();
    
    let id = this.route.snapshot.paramMap.get('id');
    this.userid = parseInt(id);

    this.techService.GetEngineerDetail(AppSettings.GetQuerySeach(1,1,this.userName,this.userid,)).subscribe((data:any)=>{     
        this.technician= data.objects;
        this.asyncSelected = this.technician.Initials;
        this.staasyncSelected = this.technician.StationName;
        this.indasyncSelected = this.technician.IndustryName;

        if(!this.technician.CanEdit){
          this.router.navigate(['pagenotfound']);
        }
        this.spinner.hide();
      },
      (err : HttpErrorResponse)=>{
        this.spinner.hide();
    })

    this.spinner.show();
    this.skillService.GetListIndustries(AppSettings.GetQuerySeach(10,1,"",13,)).subscribe((data:any)=>{     
      this.listIndustries= data.objects;
      this.listEnIndustries = data.objects;
      this.selectedInd = this.listIndustries[0].IndId;
      this.spinner.hide();
    },
    (err : HttpErrorResponse)=>{
        this.spinner.hide();
    })

    this.spinner.show();
    this.skillService.GetListMachineSKill(AppSettings.GetQuerySeach(10,1,"",13,)).subscribe((data:any)=>{     
      this.listMachineSkill= data.objects;
    },
    (err : HttpErrorResponse)=>{
        this.spinner.hide();
    })

    this.spinner.show();
        this.techService.GetListStationedEngineer(AppSettings.GetQuerySeach(50,1,this.userName,13,)).subscribe((data:any)=>{     
          this.listStationed= data.objects;         
          this.spinner.hide();
        },
        (err : HttpErrorResponse)=>{
            this.spinner.hide();
        })


    this.spinner.show();
    this.skillService.GetListProskill(AppSettings.GetQuerySeach(10,1,"",13,)).subscribe((data:any)=>{     
        this.listProskill= data.objects;
        this.spinner.hide();
      },
      (err : HttpErrorResponse)=>{
        this.spinner.hide();
      })


      //Get Source to search Initial
    this.userSource = Observable.create((observer: any) => {
        // Runs on every search
        observer.next(this.asyncSelected);
      })
        .pipe(
          mergeMap((token: string) => this.techService.SearchUserByInitial(AppSettings.GetQuerySeach(10,1,token,null,1)))
        ); 

        //Get Source to search maker name
    this.StationedSource = Observable.create((observer: any) => {
        // Runs on every search
        observer.next(this.staasyncSelected);
      })
        .pipe(
          mergeMap((token: string) => this.techService.SearchStationed(AppSettings.GetQuerySeach(10,1,token)))
        ); 


        //Get Source to search maker name
    this.industrySource = Observable.create((observer: any) => {
        // Runs on every search
        observer.next(this.indasyncSelected);
      })
        .pipe(
          mergeMap((token: string) => this.skillService.SearchIndustry(AppSettings.GetQuerySeach(10,1,token)))
        ); 

          //Get Source to search maker name
    this.machinedustrySource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.maasyncSelected);
    })
      .pipe(
        mergeMap((token: string) => this.skillService.SearchMachineMakerByIndustry(AppSettings.GetQuerySeach(10,1,token,null,this.selectedInd)))
      ); 
  }


  onOptionsSelected(event){
    this.selectedInd = event
   }

   onOptionsIndSelected(event){
    this.technician.IndustryId = event
   } 
   onOptionsStationSelected(event){
    this.technician.StationId = event;
   }

   onChange(eve : any){
    if(eve == ''|| eve != this.selectedRelMachine.MakerName)
    {
      this.selectedRelMachine = new Maker();
    }
  }

  CheckConditionMachine(item:number,id:number){
     let number = id & item ;
     let flag = true;
      if(number == 1 || number == id){
        flag = true;
      }
      else{
        flag = false;
      }  
      return flag;
  }

  onTextChange(eve : string, item:MachineSkillAssign){
    item.Comment = eve;
  }


  AddMachineSkill(){
    let checkisesxit = this.technician.listAssign.find(item=>item.Maker.RelMachineId == this.selectedRelMachine.RelMachineId);
    if(checkisesxit !=null){
      this.toastr.error("Can not add duplicate Machine");
      this.selectedRelMachine = new Maker();
      this.maasyncSelected = "";
    }
    else{
      let assignskill = new MachineSkillAssign();
      assignskill.Maker = new Maker();
      assignskill.MachineSkill = new Array<MachineSkill>();

      assignskill.Maker.MakerName = this.selectedRelMachine.MakerName;
      assignskill.Maker.MaId = this.selectedRelMachine.MaId;
      assignskill.Maker.RelMachineId = this.selectedRelMachine.RelMachineId;
      this.listAssignmachine.push(assignskill);
      this.technician.listAssign.push(assignskill);
      this.selectedRelMachine = new Maker();
      this.maasyncSelected = "";
    }
    
  }

  changeTypeaheadLoading(e: boolean): void {
    if(e){
      this.spinner.show();
    }
    else{
      this.spinner.hide();
    }
    this.typeaheadLoading = e;
  }

  RemoveMachineSkill(item : MachineSkillAssign){
      this.technician.listAssign.splice(this.technician.listAssign.findIndex(x=>x.Maker.RelMachineId == x.Maker.RelMachineId),1)
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {       
    this.technician = e.item;
    this.technician.listAssign = new Array<MachineSkillAssign>();
  }

  indtypeaheadOnSelect(e: TypeaheadMatch): void {  
    this.technician.IndustryId = e.item.IndId    
  }

  statypeaheadOnSelect(e: TypeaheadMatch): void {       
   this.technician.StationId = e.item.StationId        
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

  changeOps(event:PrettyRadioChange){
    let number = parseInt(event.value);
    if(event.checked){
      this.technician.ProSkill += number;   
    }
    else{
      this.technician.ProSkill -= number;   
    }
    
  }

  changeSkillMachines(event:PrettyCheckBoxChange,relMaker:MachineSkillAssign){
    let check = this.technician.listAssign.filter(x=>x.Maker.RelMachineId == relMaker.Maker.RelMachineId)[0];
    if(check !=null){
      let id = parseInt(event.value);
     if(event.checked){
       let machine = new MachineSkill();       
       machine.MSId = id;
       check.MachineSkill.push(machine);
       check.SkillNumber = check.SkillNumber +id;
     }
     else{        
      check.SkillNumber = check.SkillNumber - id;
      check.MachineSkill.splice(check.MachineSkill.findIndex(x=>x.MSId == parseInt(event.value)),1)
     }
   }
  }

  CheckCondition(eve:any){
      let number = eve & this.technician.ProSkill ;
      if(number == 1 || number == eve){
        return true;
      }
      else{
        return false;
      }
  }

  SubmitEngineer(){
    this.spinner.show();
    let Userid = parseInt(localStorage.getItem('UserNo'));
      this.technician.UpdatedBy = Userid;

      this.technician.listAssign.forEach(element => {
        let isexist = this.listAssignmachine.filter(x=>x.Maker.RelMachineId == element.Maker.RelMachineId)[0];
        if(isexist !=null){
            element.Comment = isexist.Comment;
        }
      });

      this.techService.UpdateTechnicianSkill(this.technician).subscribe((data:any)=>{            
        this.toastr.success("Update machine skill for technician success");
        this.spinner.hide()
        this.technician = new Technician();
        this.technician.listAssign = new Array<MachineSkillAssign>();
        this.asyncSelected = "";
        this.indasyncSelected= "";
        this.staasyncSelected = "";
        this.router.navigate(['home/engineer-detail/',this.userid]);
      },
      (err : HttpErrorResponse)=>{
      })   

  }

  ValidateSubmitEngineer(){
    let flag = false;
    if(this.technician.listAssign.length < 1){
        flag = true;
    }
    return flag;
  }

  BackHome(){
    this.router.navigate(['/']);
  }
}