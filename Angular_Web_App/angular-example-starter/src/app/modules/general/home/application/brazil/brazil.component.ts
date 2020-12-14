import { AlertService } from './../../../shared/services/alert.service';
import { Jsonregisteroddanalysis } from './../../../shared/models/jsonregisteroddanalysis.model';
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

 

  constructor (
    
  ) { }

  ngOnInit(): void {
   
  }


}
