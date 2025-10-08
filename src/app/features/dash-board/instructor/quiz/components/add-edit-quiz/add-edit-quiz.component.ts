import { QuizService } from './../../services/quiz.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InstructorService } from '../../../services/instructor.service';
import { IGroup, IGroupReq } from '../../../interfaces/IGroup';
import { ToastrService } from 'ngx-toastr';
import { QuizCodeComponent } from '../quiz-code/quiz-code.component';

@Component({
  selector: 'app-add-edit-quiz',
  templateUrl: './add-edit-quiz.component.html',
  styleUrl: './add-edit-quiz.component.scss',
  standalone: false,
})
export class AddEditQuizComponent implements OnInit {
  currentLang = 'en';
  data: any;
  durations: number[] = [10, 20, 30, 45, 60]; // in minutes
  questionsNumbers: number[] = [1, 5, 10, 15, 20];
  scoresPerQuestion: number[] = [1, 2, 5, 10];
  difficulties: string[] = ['easy', 'medium', 'hard'];
  categories: string[] = ['FE', 'BE', 'DO'];
  listGroup: IGroup[] = [];
  code: any;
  quiz:any
  constructor(
    private dialogService: DialogService,
    private cd: ChangeDetectorRef,
    private _QuizService: QuizService,
    private _InstructorService: InstructorService,
    private _ToastrService: ToastrService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    if (this.config && this.config.data) {
      this.quiz = this.config.data
     const schaduleDate = this.quiz.schadule ? new Date(this.quiz.schadule) : null;
      this.addQuizForm.patchValue({
        title: this.quiz.title,
        description: this.quiz.description,
        group: this.quiz.group,
        questions_number: this.quiz.questions_number,
        difficulty: this.quiz.difficulty,
        type: this.quiz.type,
        schadule: schaduleDate,
        duration: this.quiz.duration,
        score_per_question: this.quiz.score_per_question,
      });
    }
    this.cd.detectChanges();
    this.getAllGroups();
  }

  addQuizForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    group: new FormControl('', Validators.required),
    questions_number: new FormControl([Validators.required]),
    difficulty: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    schadule: new FormControl<Date | null>(null, Validators.required),
    duration: new FormControl('', Validators.required),
    score_per_question: new FormControl('', Validators.required),
  });

  AddNewQuiz() {
      if (this.config && this.config.data){
      this.quiz = this.config.data
       this._QuizService.UpdateQuiz(this.quiz._id , this.addQuizForm.value.title).subscribe({
        next:(res)=>{
         this._ToastrService.success('your quiz has been updated successfully')
         this.ref.close(this.code);
        }
       })
      }
      else{
            this._QuizService.createQuiz(this.addQuizForm.value).subscribe({
      next: (res) => {
        this._ToastrService.success('your quiz has been added sussefully');
        this.code = res.data.code;
      },
      complete: () => {
        this.ref.close(this.code);
      },
    });
      }
  }

  getAllGroups() {
    this._InstructorService.getAllGroup().subscribe({
      next: (res) => {
        this.listGroup = res;
      },
    });
  }

  close() {
    this.ref.close();
  }

  openSecondDialog(data: any) {
    this.dialogService.open(QuizCodeComponent, {
      width: '400px',
      data: data,
      styleClass: 'custom-dialog',
    });
  }
}
