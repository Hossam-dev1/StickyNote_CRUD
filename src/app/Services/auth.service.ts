import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient)
  {
    if(localStorage.getItem('userToken'))
    {
      this.saveUserToken(); // to fill currentUserData again when reload
    }
  }

  currentUserData:any = new BehaviorSubject(null);


  signUp(formData:object):Observable<any>
  {
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signup',formData)
  }

  signIn(formData:object):Observable<any>
  {
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signin',formData)
  }

  saveUserToken()
  {
    let getToken:any = localStorage.getItem('userToken');

    let decoded = jwt_decode(getToken);
    this.currentUserData.next(decoded);
    
    // this.currentUserData = decoded;
  }

  logOut()
  {
    localStorage.removeItem('userToken');
    this.currentUserData.next(null);
  }
}
