import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SharedModule } from '../../../../../shared/shared.module';
import { StudentsService } from '../../Services/students.service';

@Component({
  selector: 'app-delete-students',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './delete-students.component.html',
  styleUrls: ['./delete-students.component.scss']
})
export class DeleteStudentsComponent {
  studentId!: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private studentService: StudentsService
  ) {
    this.studentId = this.config.data.id;
  }

  confirmDelete() {
    this.studentService.DeleteStudent(this.studentId).subscribe({
      next: () => {
        console.log(`✅ Student with ID ${this.studentId} deleted successfully`);
        this.ref.close(true);
      },
      error: (err) => console.error('❌ Error deleting student:', err),
    });
  }

  closeDialog() {
    this.ref.close(false);
  }
}
