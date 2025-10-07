import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { IList } from '../../../interfaces/IQuestions';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { InstructorService } from '../../../services/instructor.service';

@Component({
  selector: 'app-view-questions',
  imports: [SharedModule],
  templateUrl: './view-questions.component.html',
  styleUrl: './view-questions.component.scss'
})
export class ViewQuestionsComponent {
  question: any;

  constructor(
    private ref: DynamicDialogRef,
    private _InstructorService: InstructorService,
    private _ToastrService: ToastrService,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(){
    this.get();
  }
    get(){
    const questionId = this.config.data.question._id;
    console.log(questionId);
    if (questionId) {
      this.getById(questionId);
    }
  }
  getById(id: string) {
    this._InstructorService.getQuestionsById(id).subscribe({
      next: (res) => {
        this.question = res;
        console.log(this.question);
      },
    });
  }

  optionKeys(): string[] {
    return ['A', 'B', 'C', 'D'].filter(k => !!this.question?.options?.[k]);
  }

  displayType(code?: string) {
    const map: Record<string, string> = { FE: 'Front End', BE: 'Back End', DO: 'DevOps' };
    return map[code ?? ''] ?? code;
  }


  close() {
    this.ref.close();
  }
}
