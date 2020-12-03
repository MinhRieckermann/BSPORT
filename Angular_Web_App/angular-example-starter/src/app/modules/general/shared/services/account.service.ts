import { JsonRegisterAccount } from './../models/json-register-account.model';
import { Injectable } from '@angular/core';
import { AppSettings } from './../constant/tsconstant';
import { QuerySearch } from './../models/query-search.model';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { Account } from './../models/account.model';


@Injectable()
export class AccountService {
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

  public getIPAddress()
  {
    return this.http.get("http://api.ipify.org/?format=json");
  }
  userAuthentication(userName, password) {
    let data = "username=" + userName + "&password=" + password + "&grant_type=password&client_id=NgAuthApp";
    return this.http.post(this.rootUrl + '/Token', data,{headers:{'No-Auth':'True','Content-Type':'application/x-www-form-urlencoded'}});
  }

  userAuthenticationusingF5token(){
    let data = "refresh_token=" + localStorage.getItem('refreshToken') + "&grant_type=refresh_token&client_id=NgAuthApp";
    return this.http.post(this.rootUrl + '/Token', data,{headers:{'No-Auth':'True','Content-Type':'application/x-www-form-urlencoded'}});
  }

  getUserClaims():Observable<Account>{
    return  this.http.post<Account>(this.rootUrl+'/api/Account/GetUserClaims',{'Content-Type':'application/x-www-form-urlencoded'});
  }

  registeraccount(model:JsonRegisterAccount)
  {
    var body =JSON.stringify(model)
    return this.http.post(this.rootUrl+"/api/Account/Register",body,{
      headers: { "Content-Type": "application/json" },
    })
  }
}
