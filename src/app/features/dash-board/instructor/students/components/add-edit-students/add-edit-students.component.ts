import { IGroup } from './../../../interfaces/IGroup';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StudentsService } from '../../Services/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Istudents } from '../../Interfaces/istudents';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ToastrService } from 'ngx-toastr';

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
  students: Istudents[] = [];
  action!: 'add' | 'edit';
  studentToEdit!: Istudents | null;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private toaster:ToastrService
  ) {}

  ngOnInit(): void {
    this.action = this.config.data.action;
    this.studentToEdit = this.config.data.student || null;

    this.form = this.fb.group({
      student: [null, Validators.required],
      group: [null, Validators.required],
    });

    this.loadStudents();
    this.loadGroups();
  }

  loadStudents() {
    this.studentsService.Getter().subscribe({
      next: (res) => {
        this.students = res;
        if (this.action === 'edit' && this.studentToEdit) {
          const foundStudent = this.students.find(
            (s) => s._id === this.studentToEdit!._id
          );
          console.log(foundStudent);
          
          this.form.patchValue({ student: foundStudent?._id,group:foundStudent?.group?._id});
        }
      },
      error: (err) => console.error('Error loading students:', err),
    });
  }

  loadGroups() {
    this.studentsService.Groups().subscribe({
      next: (res) => {
        this.groups = res;
        if (this.action === 'edit' && this.studentToEdit?.group) {
          const foundGroup = this.groups.find(
            (g) => g._id === this.studentToEdit!.group!._id
          );
         
        }
      },
      error: (err) => console.error('Error loading groups:', err),
    });
  }

  getFullName(student: Istudents): string {
    return `${student.first_name} ${student.last_name}`;
  }

  onSubmit() {
  if (this.form.invalid) return;

  const formValue = this.form.value;

  let student = this.form.get('student')!.value
  let group = this.form.get('group')!.value
  if (this.action === 'add') {
    this.studentsService.addStudent(student,group).subscribe({
      next: (res) => {
        this.toaster.success(res.message)
        this.ref.close(true)
      },
      error: (err) => console.error('❌ Error adding student:', err),
    });
  } else {
    this.studentsService.updateStudent(student,group).subscribe({
      next: (res) => {
        this.toaster.success(res.message);
        this.ref.close(true)
      },
      error: (err) => console.error('❌ Error updating student:', err),
    });
  }
}

closeDialog(): void {
  this.ref.close(false);
}

}
