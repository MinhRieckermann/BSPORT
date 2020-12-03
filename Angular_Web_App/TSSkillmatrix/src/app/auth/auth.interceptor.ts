
import {throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';

import {take, filter, catchError, switchMap, finalize, timeout} from 'rxjs/operators';
import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";

import {  Router } from '@angular/router';
import { AuthService } from '../shared/services/authService.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    count = 0;
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private router : Router,private injector: Injector, ) {}

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }})
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        const authService = this.injector.get(AuthService);
        if (req.headers.get('No-Auth') == "True"){
            return next.handle(req.clone()).pipe(timeout(100000));
        }
        return next.handle(this.addToken(req, authService.getAuthToken())).pipe(
            timeout(100000),
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    this.count++;
                    console.log(error.status);
                    switch ((<HttpErrorResponse>error).status) {
                        case 400:
                            return this.handle400Error(error);
                        case 498:
                            return this.handle401Error(req, next);
                    }
                } else {
                    return observableThrowError(error);
                }
            }));
    }

    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            console.log(error.status);
            return this.logoutUser();
        }

        return observableThrowError(error);
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            const authService = this.injector.get(AuthService);
            
            return authService.refreshToken().pipe(
                switchMap((newToken: string) => {
                    console.log('this.newToken :' + newToken)
                    if (newToken) {
                        this.tokenSubject.next(newToken);
                        return next.handle(this.addToken(req, newToken));
                    }

                    // If we don't get a new token, we are in trouble so logout.
                    return this.logoutUser();
                }),
                catchError(error => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    return this.logoutUser();
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                }),);
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(req, token));
                }),);
        }
    }


    logoutUser() {
        // Route to the login page (implementation up to you)
        localStorage.clear();
        this.router.navigate(["login"]);
        return observableThrowError("");
    }
}


