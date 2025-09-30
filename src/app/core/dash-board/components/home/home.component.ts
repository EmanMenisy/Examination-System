import { IStudent } from './../../Interfaces/home';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent implements OnInit {
studentList:IStudent[] = []
  constructor(private _HomeService:HomeService) {    
  }

  ngOnInit(): void {
    this.getTopStudents()
  }

  getTopStudents(){
    this._HomeService.getTopStudents().subscribe({
      next:(res)=>{
        this.studentList = res
        console.log(this.studentList)
      },
      error:(err)=>{console.log(err)},
    })
  }

}
