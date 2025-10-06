import { Component, OnInit } from '@angular/core';
import { SharedModule } from "../../../../../../shared/shared.module";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-quiz-code',
  imports: [SharedModule],
  templateUrl: './quiz-code.component.html',
  styleUrl: './quiz-code.component.scss'
})
export class QuizCodeComponent implements OnInit {
  code:any 
  constructor( private ref: DynamicDialogRef,
  private config: DynamicDialogConfig ) {
    
  }
  ngOnInit(): void {
    this.code = this.config.data
  }

   copyText() {
    navigator.clipboard.writeText(this.code).then(() => {
      console.log('Copied: ', this.code);
    });
  }


  close(){
    this.ref.close()
  }
}
