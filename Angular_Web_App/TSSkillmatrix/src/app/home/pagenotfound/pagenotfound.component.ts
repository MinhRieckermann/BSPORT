import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit,Component } from '@angular/core';



@Component({
  selector: 'app-pnf',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class GeneralPageNotFoundComponent implements OnInit {
  isRemember:boolean=false;
  isLoginError : boolean = false;
  errormes :string;
  max: number = 10;
  rate: number = 0;
  isReadonly: boolean = false;

  overStar: number | undefined;
  percent: number;
 
  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }
 
  resetStar(): void {
    this.overStar = void 0;
  }


  constructor(private router : Router) { }

  ngOnInit() {

  }
}
