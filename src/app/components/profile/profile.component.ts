import jwt_decode from "jwt-decode";
import { Injectable } from '@angular/core';
import { NotesService } from './../../Services/notes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

declare var $:any;

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  allNote:any;
  getToken:any;
  decoded:any;
  spinner:boolean= false;
  constructor(private _NotesService:NotesService)
  {
    this.getToken = localStorage.getItem('userToken');
    this.decoded= jwt_decode(this.getToken);
    console.log(this.decoded);

    this.spinner = true;
    this.displayNotes()

  }

  AddNote:FormGroup = new FormGroup(
    {
      title: new FormControl(null,Validators.required),
      desc: new FormControl(null,Validators.required)
    })

    displayNotes()
    {
      let objectToken =
      {
        token:this.getToken,
        userID:this.decoded._id
      }

      this._NotesService.getUserNote(objectToken).subscribe((res)=>
      {
        this.allNote = res.Notes;
        this.spinner = false;
        console.log(res.Notes);
      })




    }

    addNote()
    {
      let noteObject =
      {
        title:this.AddNote.value.title,
        desc:this.AddNote.value.desc,
        token:this.getToken,
        citizenID:this.decoded._id
      }
      this._NotesService.addNoteApi(noteObject).subscribe((res)=>
      {
        if(res.message == "success")
        {
          $('#mymodal').modal("hide");
          this.spinner = true;
          this.AddNote.reset();   //speace input vales
          this.displayNotes();
        }
      })
    }
//===========Delete_Note=========
    myNoteId:any;
    noteId(id:any)
    {
      this.myNoteId = id;
    }

    deleteNote()
    {
      let idFormat =
      {
        token:localStorage.getItem('userToken'),
        NoteID:this.myNoteId
      }

      this._NotesService.deleteNote(idFormat).subscribe((res)=>
      {
        console.log(res);

        if(res.message == "deleted")
        {
          $('#cancleNote').modal("hide");
          this.displayNotes();
        }
      })
    }

// ======= Edit Note =========== //

EditNote:FormGroup = new FormGroup(
  {
    title: new FormControl(null,Validators.required),
    desc: new FormControl(null,Validators.required)
  })

    setValue()
    {
      for (let i = 0; i < this.allNote.length; i++)
      {
        if(this.allNote[i]._id == this.myNoteId)
        {

          this.EditNote.controls.title.setValue(this.allNote[i].title);
          this.EditNote.controls.desc.setValue(this.allNote[i].desc);
        }

      }
    }

    editNote()
    {
      let editData =
      {
        title:this.EditNote.value.title,
        desc:this.EditNote.value.desc,
        NoteID:this.myNoteId,
        token:this.getToken
      }
      // console.log(editData)
      this._NotesService.updateNote(editData).subscribe((res)=>
      {
        if(res.message == 'updated')
        {
          // console.log(res)
          $('#EditBtn').modal("hide");
          this.displayNotes();
        }


      })
    }


  ngOnInit(): void {
  }

}
