import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router:Router) {}

  errors:string = "";

  signUpForm = new FormGroup
    ({

      first_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      last_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      age: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(80)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z0-9]{3,10}$')]),

    });


  upClick(signUpForm: FormGroup)
  {

    this._AuthService.signUp(signUpForm.value).subscribe((data)=>
    {

      if (data.message == "success")
      {
        this._Router.navigate(['/signin']);
      }
      else
      {
        this.errors = data.errors.email.message;
        console.log(this.errors)
      }
    }
    )
  }


  ngOnInit(): void {
    $("#signUp").particleground();
  }

}
