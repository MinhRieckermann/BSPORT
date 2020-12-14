import { Component, OnInit } from '@angular/core';
import { Oddanalysis } from './../../../shared/models/oddanalysis.model';
import { AppSettings } from './../../../shared/constant/tsconstant';
import { OddAnalysisService } from './../../../shared/services/odd-analysis-service.service';
import { AlertService } from './../../../shared/services/alert.service';
import { Jsonregisteroddanalysis } from './../../../shared/models/jsonregisteroddanalysis.model';
import { Account } from './../../../shared/models/account.model';
import { FormBuilder} from '@angular/forms';
import { Observable } from "rxjs";
import { HttpErrorResponse,HttpClient } from "@angular/common/http";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FilterModel } from './../../../shared/models/filter-model';
@Component({
  selector: 'app-paraguay',
  templateUrl: './paraguay.component.html',
  styleUrls: ['./paraguay.component.css']
})
export class ParaguayComponent implements OnInit {
  // declare variable 
currentPage: number = 1;
totalItem: number;
filter: FilterModel;
  Create_data =new Jsonregisteroddanalysis();
  data_Oddanalysis: Array<Oddanalysis>;
  userName: string;
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    public oddAnalysisService: OddAnalysisService,
  ) { }

  exampleForm = this.fb.group({
    country: [''],
    tournament: [''],
    season: [''],
    Week: [''],
    Match: [''],
    TypeBet: [''],
    Home: [''],
    HomeOdd: [''],
    Away: [''],
    AwayOdd: [''],
    Result: ['']
  });
  ngOnInit(): void {
    
    
    this.updateControls();
    this.userName = localStorage.getItem("UserName");
    this.oddAnalysisService
        .GetlistOdd_Analysis(AppSettings.GetQueryOddModel("Paraguay","Primera Division, Clausura","Primera Division, Clausura 2020",10,1))
        .subscribe(
          (data:any)=>{
            this.data_Oddanalysis=data.objects;
            this.totalItem = data.totalItem;
          }
        )
  }

  updateControls(): void {
    this.exampleForm.patchValue({
      country: 'Paraguay',
      tournament: 'Primera Division, Clausura',
      season: 'Primera Division, Clausura 2020',
      TypeBet: 'Handicap',
      Match: null,
      Home:null,
      HomeOdd:null,
      Away:null,
      AwayOdd:null,
      Result:null
    });
  }

  resetControls(): void {
    this.exampleForm.patchValue({
      country: 'Paraguay',
      tournament: 'Primera Division, Clausura',
      season: 'Primera Division, Clausura 2020',
      Week: null,
      Match: null,
      TypeBet: 'Handicap',
      Home:null,
      HomeOdd:null,
      Away:null,
      AwayOdd:null,
      Result:null,
    });
  }
  saveControls(){
   
    this.oddAnalysisService.Register(this.exampleForm.value).subscribe(
      data=>{
        this.alertService.success('Registration successful', true);
        this.updateControls();
      }
      )
  }
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.oddAnalysisService
        .GetlistOdd_Analysis(AppSettings.GetQueryOddModel("Paraguay","Primera Division, Clausura","Primera Division, Clausura 2020",10,this.currentPage))
        .subscribe(
          (data:any)=>{
            this.data_Oddanalysis=data.objects;
            this.totalItem = data.totalItem;
          }
        )
  }
}
