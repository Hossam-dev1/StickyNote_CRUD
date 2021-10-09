import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient:HttpClient)
  { }

  getUserNote(userData:any):Observable<any>
  {
    return this._HttpClient.post('https://routeegypt.herokuapp.com/getUserNotes',userData)
  }

  addNoteApi(userData:any):Observable<any>
  {
    return this._HttpClient.post('https://routeegypt.herokuapp.com/addNote',userData)
  }

  deleteNote(userData:any):Observable<any>
  {
    let options:object =
    {
      headers: new HttpHeaders({}),
      body:{
        NoteID:userData.NoteID,
        token:userData.token
      }
    }
    return this._HttpClient.delete('https://routeegypt.herokuapp.com/deleteNote',options)
  }


  updateNote(userData:any):Observable<any>
  {
    return this._HttpClient.put('https://routeegypt.herokuapp.com/updateNote',userData)
  }
}
