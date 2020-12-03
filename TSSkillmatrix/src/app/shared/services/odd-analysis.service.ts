import { OddAnalysis } from './../models/odd-analysis.model';
import { QuerySearch } from './../models/QuerySearchModel.model';
import { QueryOddModelCW } from './../models/query-odd-model-c-w.model';
import { QueryOddModel } from './../models/query-odd-model.model';
import { JsonRegisterOddAnalysis } from './../models/json-register-odd-analysis.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSettings } from "../constant/TSconstands.component";



@Injectable()
export class OddAnalysisService {

  readonly rootUrl = AppSettings.API_service;

  constructor(private http: HttpClient) {}

  Register(query:JsonRegisterOddAnalysis)
  {
    var body=JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Odd/Register", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  UpdateInfo(query:OddAnalysis)
  {
    var body=JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Odd/Update", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  GetlistOdd_Analysis(query:QueryOddModel)
  {
    var body=JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Odd/GetlistOdd_Analysis", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  GetlistOdd_Analysis_Country(query:QueryOddModel)
  {
    var body=JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Odd/GetlistOdd_Analysis_Country", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  GetlistOdd_Analysis_Country_Week(query:QueryOddModel)
  {
    var body=JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Odd/GetlistOdd_Analysis_Country_Week", body, {
      headers: { "Content-Type": "application/json" },
    });
  }
}
