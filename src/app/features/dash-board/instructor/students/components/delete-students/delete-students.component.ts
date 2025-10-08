import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { StudentsService } from '../../Services/students.service';
import { SharedModule } from '../../../../../../shared/shared.module';

@Component({
  selector: 'app-delete-students',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './delete-students.component.html',
  styleUrls: ['./delete-students.component.scss'],
})
export class DeleteStudentsComponent {
  studentId!: string;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private studentsService: StudentsService
  ) {
    this.studentId = this.config.data?.id;
  }

  confirmDelete(): void {
    if (!this.studentId) {
      console.error('❌ No student ID provided');
      return;
    }

    this.studentsService.DeleteStudent(this.studentId).subscribe({
      next: () => {
        console.log(`✅ Student with ID ${this.studentId} deleted successfully`);
        this.ref.close(true);
      },
      error: (err) => console.error('❌ Error deleting student:', err),
    });
  }

  cancel(): void {
    this.ref.close(false);
  }

  closeDialog(): void {
    this.ref.close(false);
  }
}
