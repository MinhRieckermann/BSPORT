import { User } from './../models/user.model';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { QuerySearch } from '../models/QuerySearchModel.model';
import { AppSettings } from '../constant/TSconstands.component';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  readonly rootUrl = AppSettings.API_service;

  private pagename =  new BehaviorSubject<string>('DASHBOARD');
  private userrole = new BehaviorSubject<number>(0);
  public userRole = 13;
  cast = this.pagename.asObservable();
  castuserrole = this.userrole.asObservable();
  constructor(private http: HttpClient) { 
  }  

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
  
  sendMailLogin(query:QuerySearch){
    var body = JSON.stringify(query);
    return  this.http.post(this.rootUrl+'api/technician/SendMailLogin',body,{headers:{'Content-Type':'application/json'}})
  }


  userAuthentication(userName, password) {
    let data = "username=" + userName + "&password=" + password + "&grant_type=password&client_id=NgAuthApp";
    return this.http.post(this.rootUrl + '/login', data,{headers:{'No-Auth':'True','Content-Type':'application/x-www-form-urlencoded'}});
  }

  userAuthenticationusingF5token(){
    let data = "refresh_token=" + localStorage.getItem('refreshToken') + "&grant_type=refresh_token&client_id=NgAuthApp";
    return this.http.post(this.rootUrl + '/login', data,{headers:{'No-Auth':'True','Content-Type':'application/x-www-form-urlencoded'}});
  }

  getUserClaims():Observable<User>{
    return  this.http.post<User>(this.rootUrl+'/api/User/GetUserClaims',{'Content-Type':'application/x-www-form-urlencoded'});
  }
}