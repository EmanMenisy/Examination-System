import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StudentsService } from '../../Services/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGroup } from '../../../instructor/interfaces/IGroup';
import { SharedModule } from '../../../../../shared/shared.module';
import { Istudents } from '../../Interfaces/istudents';

@Component({
  selector: 'app-add-edit-student',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-edit-students.component.html',
  styleUrls: ['./add-edit-students.component.scss'],
})
export class AddEditStudentComponent implements OnInit {
  form!: FormGroup;
  groups: IGroup[] = [];
  action!: 'add' | 'edit';
  studentToEdit: any;
students: Istudents[] = [];

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.action = this.config.data.action;
    this.studentToEdit = this.config.data.student;

    this.form = this.fb.group({
      name: [this.studentToEdit?.name || '', Validators.required],
      email: [
        this.studentToEdit?.email || '',
        [Validators.required, Validators.email],
      ],
      group: [this.studentToEdit?.group?._id || '', Validators.required],
    });

    this.getGroups();
  }

  getGroups() {
    this.studentsService.Groups().subscribe({
      next: (res) => (this.groups = res),
      error: (err) => console.error('Error loading groups:', err),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const payload = { ...formValue, group: { _id: formValue.group } };

    if (this.action === 'add') {
      this.studentsService.addStudent(payload).subscribe({
        next: () => this.ref.close(true),
        error: (err) => console.error('Error adding student:', err),
      });
    } else {
      this.studentsService.updateStudent(this.studentToEdit._id, payload).subscribe({
        next: () => this.ref.close(true),
        error: (err) => console.error('Error updating student:', err),
      });
    }
  }

  closeDialog() {
    this.ref.close(false);
  }
}
