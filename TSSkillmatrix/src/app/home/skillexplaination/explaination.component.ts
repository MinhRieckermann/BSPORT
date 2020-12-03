import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Industry } from '../../shared/models/Industry.model';
import { SkillService } from '../../shared/services/skillservice.service';
import { AppSettings } from '../../shared/constant/TSconstands.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfessionalSkill } from '../../shared/models/ProfessionalSkill.model';
import { MachineSkill } from '../../shared/models/MachineSkill.model';

@Component({
  selector: 'app-explaination',
  templateUrl: './explaination.component.html',
})
export class ExplainationComponent implements OnInit {
    listIndustries : Array<Industry>;
    listProskill :Array<ProfessionalSkill>;
    listMachineSkill :Array<MachineSkill>;
  constructor(private spinner: NgxSpinnerService,private router: Router,public skillService : SkillService) { }
  ngOnInit() {
    this.listIndustries = new Array<Industry>();
    this.listProskill = new Array<ProfessionalSkill>();
    this.listMachineSkill = new Array<MachineSkill>();
    
    this.skillService.GetListIndustries(AppSettings.GetQuerySeach(10,1,"",13,)).subscribe((data:any)=>{     
      this.listIndustries= data.objects;
    },
    (err : HttpErrorResponse)=>{
    })


    this.spinner.show();
    this.skillService.GetListMachineSKill(AppSettings.GetQuerySeach(10,1,"",13,)).subscribe((data:any)=>{     
      this.listMachineSkill= data.objects;
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

  }

  BackHome(){
    this.router.navigate(['/']);
  }
}