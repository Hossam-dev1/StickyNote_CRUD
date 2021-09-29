import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';




declare var $:any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router) { }

  errors:string = "";
  // currentUserData:any ;

  signInForm: FormGroup = new FormGroup({

    email: new FormControl(null , [Validators.email , Validators.required]),
    password: new FormControl(null , [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/) ,  Validators.required])


  });

  inClick(formData:FormGroup)
  {
    this._AuthService.signIn(formData.value).subscribe((response)=>
    {
      console.log(response.message)
      if (response.message == "success")
      {


        localStorage.setItem('userToken',response.token);
        this._AuthService.saveUserToken();
        this._Router.navigate(["/profile"]);
      }
      else
      {
        this.errors = response.message;
      }
    })
  }





  ngOnInit(): void {
    $("#signIn").particleground();
  }

}
