import { OddAnalysisService } from './../shared/services/odd-analysis-service.service';
import { AppSettings } from './../shared/constant/tsconstant';
import { AccountService } from './../shared/services/account.service';
import { Account } from './../shared/models/account.model';
import { Component, OnInit ,Renderer2} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items = [
    {
      name: 'Japan', link: 'Japan',
      elements: [
        { name: 'J.League', link: 'home/Japan' }
      ]
    },
    {
      name: 'England', link: 'England',
      elements: [
        { name: 'Premier League', link: 'home/England' }
      ]
    },
    {
      name: 'Brazil', link: 'Brazil',
      elements: [
        { name: 'Brasileiro Serie A', link: 'home/Brazil' }
      ]
    },
    {
      name: 'Italy', link: 'Italy',
      elements: [
        { name: 'Serie A', link: 'home/Italy' }
      ]
    },
    {
      name: 'Germany', link: 'Germany',
      elements: [
        { name: 'Bundesliga', link: 'home/Germany' }
      ]
    },
  ];

  userClaims:Account;
  userName: string;

  constructor(
    public router: Router,
    public renderer: Renderer2,
    public accountService: AccountService,
    public oddAnalysisService:OddAnalysisService
  ) { }

  ngOnInit() {
    this.userClaims=new Account();
    this.accountService.getUserClaims().subscribe((data: Account) => {
      this.userClaims=data;
      localStorage.setItem("UserNo", this.userClaims.AccountId.toString());
      localStorage.setItem("UserName", this.userClaims.AccountName);
      this.userName=localStorage.getItem("UserName")
    }

    )
  }

  onSelectMenu(link: any): void {
    const element = document.getElementById('bd-docs-nav');
    this.renderer.removeClass(element, 'show');
    const route = '/' + link;
    this.router.navigate([route]);
  }
  Logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
