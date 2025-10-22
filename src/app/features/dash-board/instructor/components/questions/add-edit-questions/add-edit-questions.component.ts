import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../../../services/instructor.service';
import { SharedModule } from '../../../../../../shared/shared.module';
import { IList, IQuestionsReq } from '../../../interfaces/IQuestions';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-add-edit-questions',
  imports: [SharedModule],
  templateUrl: './add-edit-questions.component.html',
  styleUrl: './add-edit-questions.component.scss'
})
export class AddEditQuestionsComponent implements OnInit {

  type!: IList[];
  level!: IList[]
  options!: any[]
  data: any

  constructor(
    private _InstructorService: InstructorService,
    private _ToastrService: ToastrService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) { }



  ngOnInit() {
    this.type = [
      { name: 'Front End', code: 'FE' },
      { name: 'Back End', code: 'BE' },
      { name: 'DevOps', code: 'DO' },
    ];

    this.level = [
      { name: 'Medium', code: 'medium' },
      { name: 'Hard', code: 'hard' },
      { name: 'Easy', code: 'easy' },
    ];

    this.options = [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
    ];

    if (this.config.data.question) {
      this.updatedData();
    }
  }


  createQuestionForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    options: new FormGroup({
      A: new FormControl<string>('', [Validators.required]),
      B: new FormControl<string>('', [Validators.required]),
      C: new FormControl<string>('', [Validators.required]),
      D: new FormControl<string>('', [Validators.required]),
    }),
    answer: new FormControl<string>('', [Validators.required]),
    difficulty: new FormControl<string>('', [Validators.required]),
    type: new FormControl<string>('', [Validators.required]),
  });

  getQuestionById(id: string) {
    this._InstructorService.getQuestionsById(id).subscribe({
      next: (res: any) => {
        this.createQuestionForm.patchValue({
          title: res.title,
          description: res.description,
          options: {
            A: res.options?.A,
            B: res.options?.B,
            C: res.options?.C,
            D: res.options?.D,
          },
          answer: res.answer,
          difficulty: res.difficulty,
          type: res.type,
        });
      },
      error: () => {
        this._ToastrService.error('Failed to load question data', 'Error');
      },
    });
  }


  save() {
    const question = this.config?.data?.question;

    const formValue = this.createQuestionForm.getRawValue() as IQuestionsReq;
    if (!question?._id) {
      this.createQuestion(formValue);
    } else {
      this.updateQuestion(question._id, formValue);
    }
  }

  createQuestion(formValue: IQuestionsReq) {
    this._InstructorService.createQuestions(formValue).subscribe({
      next: () => {
        this.createQuestionForm.reset();
      }, complete: () => {
        this._ToastrService.success('Question added successfully!');
        this.close();
      }
    });
  }

  updateQuestion(id: string, formValue: IQuestionsReq) {
    this._InstructorService.updateQuestions(id, formValue).subscribe({
      next: () => {
        this._ToastrService.success('Question updated successfully!');
        this.createQuestionForm.reset();
      },
      complete: () => {
        this.close();
      }
    });
  }


  updatedData() {
    if (this.config && this.config.data) {
      this.data = this.config.data.question;
      this.createQuestionForm.patchValue({
        title: this.data.title,
        description: this.data.description,
        options: {
          A: this.data.options?.A,
          B: this.data.options?.B,
          C: this.data.options?.C,
          D: this.data.options?.D,
        },
        answer: this.data.answer,
        difficulty: this.data.difficulty,
        type: this.data.type,
      });
    }
  }


    close() {
    this.ref.close();
  }
}
