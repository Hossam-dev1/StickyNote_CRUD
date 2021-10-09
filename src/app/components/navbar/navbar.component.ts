
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router)
{
    _AuthService.currentUserData.subscribe(()=>
    {
      if(this._AuthService.currentUserData.getValue() == null)
      {
        this.isLogin = false;
        console.log("false")
      }
      else
      {
        this.isLogin = true;
      }
    })
}




logout()
{
  this._AuthService.logOut();
  this._Router.navigate(['/signin'])
}

  isLogin:boolean = false;


  ngOnInit(): void {
  }

}
