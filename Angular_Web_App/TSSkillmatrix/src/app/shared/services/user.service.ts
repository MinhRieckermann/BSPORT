import { Industry } from "./../models/Industry.model";
import { FilterModel } from "./../models/FilterModel.model";
import { User } from "./../models/user.model";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { QuerySearch } from "../models/QuerySearchModel.model";
import { AppSettings } from "../constant/TSconstands.component";
import { Injectable } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { Stationed } from "../models/Stationed.model";

@Injectable()
export class UserService {
  readonly rootUrl = AppSettings.API_service;

  private pagename = new BehaviorSubject<string>("DASHBOARD");
  private userrole = new BehaviorSubject<number>(0);
  public userRole = 13;
  private techFilterModel = new FilterModel();
  private makerFilterModel = new FilterModel();
  cast = this.pagename.asObservable();
  castuserrole = this.userrole.asObservable();
  constructor(private http: HttpClient) {
    this.techFilterModel.listStationed = new Array<number>();
    this.techFilterModel.listIndustry = new Array<number>();
    this.techFilterModel.professionals = new Array<number>();
    this.techFilterModel.machineSkills = new Array<number>();
    this.techFilterModel.makerId = 0;
    this.techFilterModel.pagenumber = 1;
    this.techFilterModel.pagesize = 10;

    this.makerFilterModel.listStationed = new Array<number>();
    this.makerFilterModel.listIndustry = new Array<number>();
    this.makerFilterModel.professionals = new Array<number>();
    this.makerFilterModel.machineSkills = new Array<number>();
    this.makerFilterModel.pagenumber = 1;
    this.makerFilterModel.pagesize = 10;
  }

  UpdatePageNumber(val: number) {
    this.techFilterModel.pagenumber = val;
  }

  UpdatePageNumberOfMachine(val: number) {
    this.makerFilterModel.pagenumber = val;
  }

  GetListStation() {
    return this.techFilterModel.listStationed;
  }

  AddStations(selectItem: SelectionModel<Stationed>) {
    selectItem.selected.forEach((e) => {
      this.techFilterModel.listStationed.push(e.StationId);
    });
  }
  AddIndustry(selectItem: SelectionModel<Industry>) {
    selectItem.selected.forEach((e) => {
      this.techFilterModel.listIndustry.push(e.IndId);
    });
  }

  AddMakerIndustry(ind: SelectionModel<Industry>) {
    ind.selected.forEach((e) => {
      this.makerFilterModel.listIndustry.push(e.IndId);
    });
  }

  ResetFilter() {
    this.techFilterModel.listStationed = new Array<number>();
    this.techFilterModel.listIndustry = new Array<number>();
    this.techFilterModel.professionals = new Array<number>();
    this.techFilterModel.machineSkills = new Array<number>();
    this.techFilterModel.makerId = 0;
    this.techFilterModel.pagenumber = 1;
    this.techFilterModel.pagesize = 10;
  }

  GetRegEngineerDetail(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(
      this.rootUrl + "/api/technician/GetRegEngineerDetail",
      body,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  getTechFilter() {
    return this.techFilterModel;
  }

  AddNewTechFilter(model: FilterModel) {
    this.techFilterModel = model;
  }

  AddStationList(numbers: Array<number>) {
    this.techFilterModel.listStationed = new Array<number>();
    numbers.forEach((x) => {
      this.techFilterModel.listStationed.push(x);
    });
  }

  AddNewProskillList(number: number) {
    this.techFilterModel.professionalNumber = number;
  }

  AddNewMachineList(number: number) {
    this.techFilterModel.machineSkillNumber = number;
  }

  AddNewMakerFilter(model: FilterModel) {
    this.makerFilterModel = model;
  }
  getMakerFilter() {
    return this.makerFilterModel;
  }

  AddTechName(name: string) {
    this.techFilterModel.name = name;
  }

  AddMakerName(name: string) {
    this.makerFilterModel.name = name;
  }

  ChangePageNumber(pagenumber: number) {
    this.techFilterModel.pagenumber = pagenumber;
  }

  ChangePageSizeNumber(pagesize: number) {
    this.techFilterModel.pagesize = pagesize;
  }

  SetPageName(pagename): void {
    this.pagename.next(pagename);
  }

  SetUserRole(userrole): void {
    this.userrole.next(userrole);
  }

  public getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  getEmployeeInformation(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(
      this.rootUrl + "api/technician/GetEmployeeInformation",
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  sendMailLogin(query: QuerySearch) {
    var body = JSON.stringify(query);
    return this.http.post(this.rootUrl + "api/technician/SendMailLogin", body, {
      headers: { "Content-Type": "application/json" },
    });
  }

  userAuthentication(userName, password) {
    let data =
      "username=" +
      userName +
      "&password=" +
      password +
      "&grant_type=password&client_id=NgAuthApp";
    return this.http.post(this.rootUrl + "/login", data, {
      headers: {
        "No-Auth": "True",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  userAuthenticationusingF5token() {
    let data =
      "refresh_token=" +
      localStorage.getItem("refreshToken") +
      "&grant_type=refresh_token&client_id=NgAuthApp";
    return this.http.post(this.rootUrl + "/login", data, {
      headers: {
        "No-Auth": "True",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  getUserClaims(): Observable<User> {
    return this.http.post<User>(this.rootUrl + "/api/User/GetUserClaims", {
      "Content-Type": "application/x-www-form-urlencoded",
    });
  }
}
