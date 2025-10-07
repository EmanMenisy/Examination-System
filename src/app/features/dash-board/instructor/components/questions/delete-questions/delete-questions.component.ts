import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-questions',
  imports: [SharedModule],
  templateUrl: './delete-questions.component.html',
  styleUrl: './delete-questions.component.scss'
})
export class DeleteQuestionsComponent {
  constructor(private ref: DynamicDialogRef) { }
    confirmDelete() {
  this.ref.close(true);
  }

cancel() {
  this.ref.close(false);
}
}
