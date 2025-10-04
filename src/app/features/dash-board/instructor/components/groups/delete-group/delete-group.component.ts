import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-group',
  imports: [SharedModule],
  templateUrl: './delete-group.component.html',
  styleUrl: './delete-group.component.scss'
})
export class DeleteGroupComponent {
  constructor(private ref: DynamicDialogRef) { }
    confirmDelete() {
  this.ref.close(true);
  }

cancel() {
  this.ref.close(false);
}
}
