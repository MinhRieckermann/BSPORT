import { HttpClient } from "@angular/common/http";
import { of as observableOf, Observable } from "rxjs";
import { delay, mergeMap, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AppSettings } from "../constant/TSconstands.component";

@Injectable()
export class AuthService {
  // Assuming this would be cached somehow from a login call.
  public authTokenStale: string = localStorage.getItem("userToken");
  public authTokenNew: string = localStorage.getItem("userToken");
  public currentToken: string = localStorage.getItem("userToken");

  readonly rootUrl = AppSettings.API_service;

  constructor(private http: HttpClient) {
    this.currentToken = this.authTokenStale;
  }

  getAuthToken() {
    this.currentToken = localStorage.getItem("userToken");
    return this.currentToken;
  }

  refreshToken(): Observable<string> {
    /*
            The call that goes in here will use the existing refresh token to call
            a method on the oAuth server (usually called refreshToken) to get a new
            authorization token for the API calls.
        */
    let data =
      "refresh_token=" +
      localStorage.getItem("refreshToken") +
      "&grant_type=refresh_token&client_id=NgAuthApp";
    this.http
      .post(this.rootUrl + "/login", data, {
        headers: {
          "No-Auth": "True",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .subscribe((data: any) => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
        localStorage.setItem("userToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        this.authTokenNew = data.access_token;
        this.currentToken = this.authTokenNew;
      });
    return observableOf(this.authTokenNew).pipe(delay(200));
  }
}
