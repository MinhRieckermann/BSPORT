import { QueryOddModel } from './../models/query-odd-model.model';
import { AppSettings } from './../constant/tsconstant';
import { Oddanalysis } from './../models/oddanalysis.model';
import { Observable,BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Jsonregisteroddanalysis } from './../models/jsonregisteroddanalysis.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OddAnalysisService {

  readonly rootUrl=AppSettings.API_service;
  private pagename= new BehaviorSubject<string>('home');
  private userrole=new BehaviorSubject<number>(0);
  public userRole=13;
  cast=this.pagename.asObservable();
  castuserole=this.userrole.asObservable();

  constructor(private http: HttpClient) { }

  SetPageName(pagename):void{
    this.pagename.next(pagename);
  }

  SetUserRole(userrole):void{
    this.userrole.next(userrole);
  }
  getUserClaims():Observable<Account>{
    return  this.http.post<Account>(this.rootUrl+'/api/Account/GetUserClaims',{'Content-Type':'application/x-www-form-urlencoded'});
  }
  Register(query:Jsonregisteroddanalysis)
  {
    var body=JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Odd/Register", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  UpdateInfo(query:Oddanalysis)
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
