import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsService } from '../../Services/students.service';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteStudentsComponent } from '../delete-students/delete-students.component';
import { Istudents } from '../../Interfaces/istudents';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
  providers: [DialogService]
})
export class ListStudentsComponent implements OnInit, OnDestroy {

  students: Istudents[] = [];
  paginatedStudents: Istudents[] = [];
  studentImages: string[] = [
    '/images/user img (1).png',
    '/images/user img.png'
  ];

  loading = true;
  rows = 8;
  first = 0;

  menuItems: MenuItem[] = [];
  selectedStudent!: Istudents;
  ref?: DynamicDialogRef;

  constructor(
    private studentService: StudentsService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.loading = true;
    this.studentService.GetterWithout().subscribe({
      next: (res) => {
        this.students = res;
        this.updatePaginatedStudents();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        this.loading = false;
      }
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedStudents();
  }

  private updatePaginatedStudents() {
    this.paginatedStudents = this.students.slice(this.first, this.first + this.rows);
  }

  openMenu(event: Event, menu: any, student: Istudents) {
    this.selectedStudent = student;

    this.menuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.onEdit(this.selectedStudent)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.openDeleteDialog(this.selectedStudent._id)
      }
    ];

    menu.toggle(event);
  }

  onEdit(student: Istudents) {
    console.log('Edit student:', student);
  }
openDeleteDialog(id: string) {
  this.ref = this.dialogService.open(DeleteStudentsComponent, {
    header: 'Confirm Delete',
    width: '350px',
    closable: true,
    modal: true,
    dismissableMask: true,
    data: { id }
  });

  this.ref.onClose.subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.fetchStudents();
    }
  });
}
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
