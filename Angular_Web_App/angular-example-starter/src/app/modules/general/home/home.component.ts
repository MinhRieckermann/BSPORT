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
        { name: 'Brasileiro Serie A', link: 'home/Brazil/Brasileiro Serie A' },
        { name: 'Brasileiro Serie B', link: 'home/Brazil/Brasileiro Serie B' }
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
    {
      name: 'Austria', link: 'Austria',
      elements: [
        { name: 'Bundesliga', link: 'home/Austria' }
      ]
    },
    {
      name: 'France', link: 'France',
      elements: [
        { name: 'Ligue 1', link: 'home/France' }
      ]
    },
    {
      name: 'Belgium', link: 'Belgium',
      elements: [
        { name: 'Pro League', link: 'home/Belgium' }
      ]
    },
    {
      name: 'Denmark', link: 'Denmark',
      elements: [
        { name: 'Superligaen', link: 'home/Denmark' }
      ]
    },
    {
      name: 'Portugal', link: 'Portugal',
      elements: [
        { name: 'Primeira Lig', link: 'home/Portugal' }
      ]
    },
    {
      name: 'Russia', link: 'Russia',
      elements: [
        { name: 'Premier League', link: 'home/Russia' }
      ]
    },
    {
      name: 'Netherland', link: 'Netherland',
      elements: [
        { name: 'Eredivisie', link: 'home/Netherland' }
      ]
    },
    {
      name: 'Paraguay', link: 'Paraguay',
      elements: [
        { name: 'Primera Division, Clausura', link: 'home/Paraguay' }
      ]
    },
    {
      name: 'Peru', link: 'Peru',
      elements: [
        { name: 'Liga 1', link: 'home/Peru' }
      ]
    },
    {
      name: 'Serbia', link: 'Serbia',
      elements: [
        { name: 'Superliga', link: 'home/Serbia' }
      ]
    },
    {
      name: 'Spain', link: 'Spain',
      elements: [
        { name: 'LaLiga', link: 'home/Spain' }
      ]
    },
    {
      name: 'Turkey', link: 'Turkey',
      elements: [
        { name: 'Süper Lig', link: 'home/Turkey' }
      ]
    },
    {
      name: 'Ukraine', link: 'Ukraine',
      elements: [
        { name: 'Premier League', link: 'home/Ukraine' }
      ]
    },
    {
      name: 'Switzerland', link: 'Switzerland',
      elements: [
        { name: 'Super League', link: 'home/Switzerland' }
      ]
    },
    {
      name: 'Mexico', link: 'Mexico',
      elements: [
        { name: 'Liga MX, Apertura', link: 'home/Mexico' }
      ]
    },
    {
      name: 'Greece', link: 'Greece',
      elements: [
        { name: 'Super League', link: 'home/Greece' }
      ]
    },
    {
      name: 'Ecuador', link: 'Ecuador',
      elements: [
        { name: 'LigaPro Serie A, Segunda Etapa', link: 'home/Ecuador' }
      ]
    },
    {
      name: 'Scotland', link: 'Scotland',
      elements: [
        { name: 'Premiership', link: 'home/Scotland' }
      ]
    },
    {
      name: 'Croatia', link: 'Croatia',
      elements: [
        { name: '1. HNL', link: 'home/Croatia' }
      ]
    }
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
