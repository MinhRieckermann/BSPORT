import { JsonMachineMaker } from "./../ViewModels/JsonMachineMaker.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppSettings } from "../constant/TSconstands.component";
import { QuerySearch } from "../models/QuerySearchModel.model";
import { MachinesMaker } from "../ViewModels/MachinesMaker.model";

@Injectable()
export class SkillService {
  readonly rootUrl = AppSettings.API_service;

  constructor(private http: HttpClient) {}

  GetListIndustries(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Skill/GetListIndustries", body, {
      headers: { "Content-Type": "application/json" },
    });
  }
  GetListIndustriesAll(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(
      this.rootUrl + "/api/Skill/GetListIndustriesAll",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  GetListProskill(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Skill/GetListProskills", body, {
      headers: { "Content-Type": "application/json" },
    });
  }
  CheckPermission(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Skill/CheckPermission", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  GetListMachineSKill(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(
      this.rootUrl + "/api/Skill/GetListMachineSkills",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
  }
  GetListIndustriesMachine(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(
      this.rootUrl + "/api/Skill/GetListIndustriesMachine",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  GetSelectedMachineMaker(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(
      this.rootUrl + "/api/Skill/GetIndustriesMachineById",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  GetListIndustriesMachineByKey(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(
      this.rootUrl + "/api/Skill/GetListIndustriesMachineByKey",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  AddMachineMaker(model: MachinesMaker) {
    var body = JSON.stringify(model);
    return this.http.post(this.rootUrl + "/api/Skill/AddRelIndustry", body, {
      headers: { "Content-Type": "application/json" },
    });
  }
  DeleteMaker(model: QuerySearch) {
    var body = JSON.stringify(model);
    return this.http.post(this.rootUrl + "/api/Skill/DeleteRelIndustry", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  UpdateMakerIndustry(model: MachinesMaker) {
    var body = JSON.stringify(model);
    return this.http.post(this.rootUrl + "/api/Skill/UpdateRelIndustry", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  SearchMachineMaker(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Skill/SearchMachine", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  SearchMachineMakerByIndustry(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(
      this.rootUrl + "/api/Skill/SearchMachineByIndustry",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  SearchIndustry(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(this.rootUrl + "/api/Skill/SearchIndustry", body, {
      headers: { "Content-Type": "application/json" },
    });
  }
}
