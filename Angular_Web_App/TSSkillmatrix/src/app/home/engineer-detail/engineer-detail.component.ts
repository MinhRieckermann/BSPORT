
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { SkillService } from '../../shared/services/skillservice.service';
import { TechnicianService } from '../../shared/services/technicianservice.service';
import { Technician } from '../../shared/models/technician.model';
import { AppSettings } from '../../shared/constant/TSconstands.component';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../shared/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-engineer-detail',
    templateUrl: './engineer-detail.component.html',
  })

  export class EngineerDetailsComponent implements OnInit {
    Engineer : Technician;
    totalItem : number;
    currentPage: number=1;
    userid:number;
    userName :string;
    isActive : boolean = true;
    text = "Set as Inactive";
    constructor(private spinner: NgxSpinnerService,
      private route: ActivatedRoute,private router: Router,
      public skillService : SkillService,
      public technicianService : TechnicianService,
      private dialogService : DialogService,
      private _snackBar: MatSnackBar) { }
    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.userName = localStorage.getItem('UserName');
        this.userid = parseInt(id);

        this.spinner.show();
        this.Engineer = new Technician();
        
        this.technicianService.GetEngineerDetail(AppSettings.GetQuerySeach(1,1,this.userName,this.userid,)).subscribe((data:any)=>{     
          this.Engineer= data.objects;
          this.isActive = !this.Engineer.Deactive;
          this.text = this.Engineer.Deactive ? "Set as Active" : "Set as Inactive";
          this.spinner.hide();
        },
        (err : HttpErrorResponse)=>{
          this.spinner.hide();
        })
    }

    pageChanged(event: any): void {
        this.spinner.show();
        this.currentPage = event.page;
        this.technicianService.GetListEngineer(AppSettings.GetQuerySeach(10,event.page,"",13,)).subscribe((data:any)=>{
          this.Engineer = data.objects;
          this.totalItem = data.totalItem;
    
          this.spinner.hide();
        },
        (err : HttpErrorResponse)=>{
          this.spinner.hide();
        })
    
      }

      UpdateStatus() {
        let mes = this.isActive ? "De-active technician ? " : "Active technician ?";
        let type = this.isActive ? 1: 0;
        this.dialogService.openConfirmDialog(mes).afterClosed()
        .subscribe((res)=>{
          if(res){
            this.technicianService.UpdateStatusOfTechnician(AppSettings.GetQuerySeach(10,1,"",this.Engineer.TechId,type)).subscribe((data:any)=>{
              this._snackBar.open('Update success',"", {
                duration: 5000,
                horizontalPosition: "center",
                verticalPosition: "top",
              });
              this.Engineer.Deactive = !this.Engineer.Deactive;
              this.text = this.Engineer.Deactive ? "Set as Active" : "Set as Inactive";
              this.spinner.hide();
            },
            (err : HttpErrorResponse)=>{
              this.spinner.hide();
            })
          }
        })
      }

    gotoAddEngineer(){
        this.router.navigate(['home/add-skill']);
    }

    GotoEdit(){
        this.router.navigate(['home/update-detail/',this.userid]);
    }

    BackHome() {
      this.router.navigate(['/home/list-engineer']);
    }
  }
  
