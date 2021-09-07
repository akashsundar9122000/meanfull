import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  //message='An unknown error occurred'

  constructor(@Inject(MAT_DIALOG_DATA) public data:{message:string}) { } //spl type to get data from diagog box

  ngOnInit(): void {
  }

}
