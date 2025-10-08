import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditQuestionsComponent } from '../add-edit-questions/add-edit-questions.component';
import { IQuestionsReq, IQuestionsRes } from '../../../interfaces/IQuestions';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../../../../../shared/shared.module';
import { DeleteQuestionsComponent } from '../delete-questions/delete-questions.component';
import { ViewQuestionsComponent } from '../view-questions/view-questions.component';
@Component({
  selector: 'app-list-questions',
  imports: [TableModule, SharedModule],
  templateUrl: './list-questions.component.html',
  styleUrl: './list-questions.component.scss'
})
export class ListQuestionsComponent {
  questionList: IQuestionsRes[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(private _instructorService: InstructorService, private dialogService: DialogService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this._instructorService.getAllQuestions().subscribe({
      next: (res) => {
        this.questionList = res;
        console.log(res);
      },
    });

  }

  // open dialog delete
  open(id: string) {
    this.ref = this.dialogService.open(DeleteQuestionsComponent, {
      header: 'Delete Questions',
      width: '300px',
      closable: true
    });

    this.ref.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log("Group deleted!");
        this.deleteQuestion(id);
      }
    });
  }

  deleteQuestion(id: string) {
    this._instructorService.DeleteQuestions(id).subscribe({
      next: (res) => {
        console.log(res)
      }, complete: () => {
        this.getAllQuestions()
      },
    })
  }


  openDialog(question?: IQuestionsReq) {
    this.ref = this.dialogService.open(AddEditQuestionsComponent, {
      width: '60%',
      data: { question: question },
      closable: false,
    });

    this.ref.onClose.subscribe((result) => {
      this.getAllQuestions();
    });
  }


  view(question: IQuestionsReq) {
    this.ref = this.dialogService.open(ViewQuestionsComponent, {
      width: '40rem',
      height: 'auto',
      modal: true,
      closable: true,
      data: { question: question },
      dismissableMask: true
    });
    this.ref.onClose.subscribe((result) => {
      if (result === 'success') {
        this.getAllQuestions();
      }
    });
  }
}
