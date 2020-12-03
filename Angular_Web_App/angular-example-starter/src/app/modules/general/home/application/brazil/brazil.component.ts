import { Account } from './../../../shared/models/account.model';
import { Oddanalysis } from './../../../shared/models/oddanalysis.model';
import { AppSettings } from './../../../shared/constant/tsconstant';
import { OddAnalysisService } from './../../../shared/services/odd-analysis-service.service';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import { Observable } from "rxjs";
import { HttpErrorResponse,HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-brazil',
  templateUrl: './brazil.component.html',
  styleUrls: ['./brazil.component.css']
})
export class BrazilComponent implements OnInit {

  country='Brazil'
  data_Oddanalysis: Array<Oddanalysis>;
  userName: string;

  
  name = new FormControl('');
  releaseDate = new FormControl('');
  franchise = new FormControl('');
  budget = new FormControl('');
  worldwide = new FormControl('');
  summary = new FormControl('');

  constructor (
    public oddAnalysisService: OddAnalysisService
  ) { }

  ngOnInit(): void {
    this.updateControls();
    this.userName = localStorage.getItem("UserName");
    this.oddAnalysisService
        .GetlistOdd_Analysis(AppSettings.GetQueryOddModel("Brazil","Brasileiro Serie A","Brasileiro Serie A 2020"))
        .subscribe(
          (data:any)=>{
            this.data_Oddanalysis=data.objects;

          }
        )
  }
  updateControls(): void {
    this.name.setValue('Avengers: Endgame');
    this.releaseDate.setValue('26/04/2019');
    this.franchise.setValue(true);
    this.budget.setValue('356000000');
    this.worldwide.setValue('2797800564');
    this.summary.setValue('After the devastating events of Avengers: Infinity War (2018), ' +
    'the universe is in ruins.');
  }

  resetControls(): void {
    this.name.setValue(null);
    this.releaseDate.setValue(null);
    this.franchise.setValue(null);
    this.budget.setValue(null);
    this.worldwide.setValue(null);
    this.summary.setValue(null);
  }


}
