import { FormControl } from '@angular/forms';
import { OddAnalysisService } from './../../../../shared/services/odd-analysis-service.service';
import { AppSettings } from './../../../../shared/constant/tsconstant';
import { Oddanalysis } from './../../../../shared/models/oddanalysis.model';
import { Account } from './../../../../shared/models/account.model';
import { Jsonregisteroddanalysis } from './../../../../shared/models/jsonregisteroddanalysis.model';
import { AlertService } from './../../../../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FilterModel } from './../../../../shared/models/filter-model';

@Component({
  selector: 'app-brasileiro-serie-b',
  templateUrl: './brasileiro-serie-b.component.html',
  styleUrls: ['./brasileiro-serie-b.component.css']
})
export class BrasileiroSerieBComponent implements OnInit {
    // declare variable 
currentPage: number = 1;
totalItem: number;
filter: FilterModel;
  Create_data =new Jsonregisteroddanalysis();
  data_Oddanalysis: Array<Oddanalysis>;
  userName: string;
  constructor(
    public oddAnalysisService: OddAnalysisService,
    private alertService: AlertService
  ) { }
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
  ngOnInit(): void {
    this.updateControls();
    this.userName = localStorage.getItem("UserName");
    this.oddAnalysisService
        .GetlistOdd_Analysis(AppSettings.GetQueryOddModel("Brazil","Brasileiro Série B","Brasileiro Serie B 2020",10,1))
        .subscribe(
          (data:any)=>{
            this.data_Oddanalysis=data.objects;
            this.totalItem = data.totalItem;
          }
        )
  }
  updateControls(): void {
    this.country.setValue('Brazil');
    this.tournament.setValue('Brasileiro Série B');
    this.season.setValue('Brasileiro Serie B 2020');
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
    this.tournament.setValue('Brasileiro Série B');
    this.season.setValue('Brasileiro Serie B 2020');
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
        .GetlistOdd_Analysis(AppSettings.GetQueryOddModel("Brazil","Brasileiro Série B","Brasileiro Serie B 2020",10,this.currentPage))
        .subscribe(
          (data:any)=>{
            this.data_Oddanalysis=data.objects;
            this.totalItem = data.totalItem;
          }
        )
  }
}
