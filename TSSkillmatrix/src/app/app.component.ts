import { Industry } from './shared/models/Industry.model';
import { AppSettings } from './shared/constant/TSconstands.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Skill Matrix';

  constructor(private router: Router){}

  ngOnInit() {
  }
}
