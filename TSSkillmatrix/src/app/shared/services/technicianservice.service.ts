import { FilterModel } from './../models/FilterModel.model';
import { Technician } from './../models/technician.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppSettings } from "../constant/TSconstands.component";
import { QuerySearch } from "../models/QuerySearchModel.model";
import { User } from "../models/user.model";
import { Observable } from "rxjs";

@Injectable()
export class TechnicianService {
    readonly rootUrl = AppSettings.API_service;

    constructor(private http: HttpClient) { }


    getUserClaims():Observable<User>{
        return  this.http.post<User>(this.rootUrl+'/api/technician/GetUserClaims',{'Content-Type':'application/x-www-form-urlencoded'});
    }
    
    SearchUserByInitial(query : QuerySearch){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/SearchUserInitital',body,{headers:{'Content-Type':'application/json'}})
    }

    SearchUserInitialByCountry(query : QuerySearch){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/SearchUserInititalByCountry',body,{headers:{'Content-Type':'application/json'}})
    }

    SearchTechnicianByName(query : QuerySearch){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/SearchTechnicianByName',body,{headers:{'Content-Type':'application/json'}})
    }

    FilterListEngineer(query : FilterModel){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/FilterEngineer',body,{headers:{'Content-Type':'application/json'}})
    }

    SearchStationed(query:QuerySearch){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/SearchStationed',body,{headers:{'Content-Type':'application/json'}})
      }

      GetListStationed(query:QuerySearch){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/GetListStationed',body,{headers:{'Content-Type':'application/json'}})
      }  

      GetListStationedAll(query:QuerySearch){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/GetListStationedAll',body,{headers:{'Content-Type':'application/json'}})
      }  

      GetListStationedEngineer(query:QuerySearch){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/GetListStationedEngineer',body,{headers:{'Content-Type':'application/json'}})
      } 
    AddTechnicianSkill(technician : Technician){
        var body = JSON.stringify(technician);
        return  this.http.post(this.rootUrl+'/api/technician/AddTechnicianSkill',body,{headers:{'Content-Type':'application/json'}})
    }

    UpdateTechnicianSkill(technician : Technician){
        var body = JSON.stringify(technician);
        return  this.http.post(this.rootUrl+'/api/technician/UpdateTechnicianSkill',body,{headers:{'Content-Type':'application/json'}})
    }

    GetListEngineer(query:QuerySearch){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/GetListEngineers',body,{headers:{'Content-Type':'application/json'}})
    }

    GetEngineerDetail(query:QuerySearch){
        var body = JSON.stringify(query);
        return  this.http.post(this.rootUrl+'/api/technician/GetEngineerDetail',body,{headers:{'Content-Type':'application/json'}})
    }
}