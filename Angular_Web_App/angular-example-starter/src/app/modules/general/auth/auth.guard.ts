import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(sessionStorage.getItem('IsLogin')!=null){
        if (localStorage.getItem('userToken') != null){
          let expiretime = new Date(localStorage.getItem('TokenExpire'));
          let currenttime = new Date();
          var timeDiff = Math.abs(currenttime.getTime() - expiretime.getTime());
          var diffDays = Math.ceil(timeDiff / (1000));
  
          if(diffDays >3580){
            this.router.navigate(["signin"]);
          }
          else{
            return true;
          }    
        }
      }      
      else{
        this.router.navigate(["signin"]);                    
      }
  }
  
}
