import { FilterModel } from './../../../../shared/models/filter-model';
import { Jsonregisteroddanalysis } from './../../../../shared/models/jsonregisteroddanalysis.model';
import { AlertService } from './../../../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';

import { Account } from './../../../../shared/models/account.model';
import { Oddanalysis } from './../../../../shared/models/oddanalysis.model';
import { AppSettings } from './../../../../shared/constant/tsconstant';
import { OddAnalysisService } from './../../../../shared/services/odd-analysis-service.service';
import { FormControl } from '@angular/forms';


import { Observable } from "rxjs";
import { HttpErrorResponse,HttpClient } from "@angular/common/http";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-brasileiro-serie-a',
  templateUrl: './brasileiro-serie-a.component.html',
  styleUrls: ['./brasileiro-serie-a.component.css']
})
export class BrasileiroSerieAComponent implements OnInit {
    // declare variable 
currentPage: number = 1;
totalItem: number;
filter: FilterModel;
  Create_data =new Jsonregisteroddanalysis();
  data_Oddanalysis: Array<Oddanalysis>;
  userName: string;
  
  
  country = new FormControl('');
  tournament = new FormControl('');
  season = new FormControl('');
  Week = new FormControl('');
  Match = new FormControl('');
  TypeBet = new FormControl('');
  Home = new FormControl('');
  HomeOdd = new FormControl('');
  Away = new FormControl('');
  AwayOdd = new FormControl('');
  Result = new FormControl('');
  constructor(
    public oddAnalysisService: OddAnalysisService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.updateControls();
    this.userName = localStorage.getItem("UserName");
    this.oddAnalysisService
        .GetlistOdd_Analysis(AppSettings.GetQueryOddModel("Brazil","Brasileiro Serie A","Brasileiro Serie A 2020",10,1))
        .subscribe(
          (data:any)=>{
            this.data_Oddanalysis=data.objects;
            this.totalItem = data.totalItem;
          }
        )
  }
  updateControls(): void {
    this.country.setValue('Brazil');
    this.tournament.setValue('Brasileiro Serie A');
    this.season.setValue('Brasileiro Serie A 2020');
    this.TypeBet.setValue('Handicap');
    this.Match.setValue(null);
    this.Home.setValue(null);
    this.HomeOdd.setValue(null);
    this.Away.setValue(null);
    this.AwayOdd.setValue(null);
    this.Result.setValue(null);
    
  }

  resetControls(): void {
    this.country.setValue('Brazil');
    this.tournament.setValue('Brasileiro Serie A');
    this.season.setValue('Brasileiro Serie A 2020');
    this.TypeBet.setValue('Handicap');
    this.Match.setValue(null);
    this.Home.setValue(null);
    this.HomeOdd.setValue(null);
    this.Away.setValue(null);
    this.AwayOdd.setValue(null);
    this.Result.setValue(null);
  }
  saveControls(){
    this.Create_data.country=this.country.value;
    this.Create_data.tournament=this.tournament.value;
    this.Create_data.season=this.season.value;
    this.Create_data.TypeBet=this.TypeBet.value;
    this.Create_data.Match=this.Match.value;
    this.Create_data.Week=this.Week.value;
    this.Create_data.Home=this.Home.value;
    this.Create_data.HomeOdd=this.HomeOdd.value;
    this.Create_data.Away=this.Away.value;
    this.Create_data.AwayOdd=this.AwayOdd.value;
    this.Create_data.Result=this.Result.value;
    this.oddAnalysisService.Register(this.Create_data).subscribe(
      data=>{
        this.alertService.success('Registration successful', true);
        this.resetControls();
      }
      )
  }
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.oddAnalysisService
        .GetlistOdd_Analysis(AppSettings.GetQueryOddModel("Brazil","Brasileiro Serie A","Brasileiro Serie A 2020",10,this.currentPage))
        .subscribe(
          (data:any)=>{
            this.data_Oddanalysis=data.objects;
            this.totalItem = data.totalItem;
          }
        )
  }
}
