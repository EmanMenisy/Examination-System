import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsService } from '../../Services/students.service';
import { IGroup, Istudents } from '../../Interfaces/istudents';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteStudentsComponent } from '../delete-students/delete-students.component';
import { AddEditStudentComponent } from '../add-edit-students/add-edit-students.component';
import { SharedModule } from '../../../../../../shared/shared.module';

@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
  providers: [DialogService],
})
export class ListStudentsComponent implements OnInit, OnDestroy {

  groups: any[] = [];
  selectedGroupId!: string;
  students: Istudents[] = [];
  filteredStudents: Istudents[] = [];
  paginatedStudents: Istudents[] = [];
  studentData: any = { group: null };
  loading = true;
  rows = 6;
  first = 0;
  menuItems: MenuItem[] = [];
  selectedStudent!: Istudents;
  ref?: DynamicDialogRef;
  results: any[] = [];
  studentImages: string[] = [
    '/images/user img (1).png',
    '/images/user img.png'
  ];

  constructor(
    private studentsService: StudentsService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getGroups();
  }

  ngOnDestroy(): void {
    if (this.ref) this.ref.close();
  }


  getGroups(): void {
    this.studentsService.Groups().subscribe({
      next: (res) => {
        this.groups = res;
        if (this.groups.length > 0) {
          const firstGroup = this.groups[0];
          this.studentData.group = firstGroup;
          this.getStudentsGroup(firstGroup._id);
        }
      },
    });
  }


  getStudentsGroup(groupId: any) {
this.selectedGroupId = groupId;
    this.students = [];
    this.filteredStudents = [];
    this.paginatedStudents = [];

    this.studentsService.getById(groupId).subscribe({
      next: (res: any) => {
        const studentsIds = (res.students || []).map((s: any) => s._id);
        if (!studentsIds.length) {
          this.loading = false;
          return;
        }
        let loaded = 0;
        const total = studentsIds.length;
        studentsIds.forEach((id: string) => {
          this.studentsService.getStudentById(id).subscribe({
            next: (student) => {
              this.students.push(student);
              loaded++;
              if (loaded === total) {
                this.filteredStudents = [...this.students];
                this.paginate();
                this.loading = false;
              }
            },
          });
        });
      },
    });
  }




  filterStudents(): void {
    if (this.studentData.group?._id) {
      this.filteredStudents = this.students.filter(
        (s) => s.group?._id === this.studentData.group._id
      );
    } else {
      this.filteredStudents = this.students;
    }
    this.paginate();
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.paginate();
  }

  paginate(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedStudents = this.filteredStudents.slice(start, end);
  }

  openMenu(event: Event, menu: any, student: Istudents): void {
    this.selectedStudent = student;
    this.menuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.showDialog('edit', this.selectedStudent),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.showDeleteDialog(this.selectedStudent._id),
      },
    ];
    menu.toggle(event);
  }

  showDialog(action: 'add' | 'edit', student?: Istudents): void {
    this.ref = this.dialogService.open(AddEditStudentComponent, {
      data: { action, student },
      width: '40rem',
      height: 'auto',
      contentStyle: { 'max-height': '500px', overflow: 'unset' },
      baseZIndex: 10000,
      breakpoints: "{ '1199px': '75vw', '575px': '90vw'}",
      modal: true,
      dismissableMask: true
    });

    this.ref.onClose.subscribe((result) => {
      if (result === true) {
        this.getStudentsGroup(this.studentData.group?._id);
      }
    });
  }

  showDeleteDialog(id: string): void {
    this.ref = this.dialogService.open(DeleteStudentsComponent, {
      header: 'Delete Student',
      width: '300px',
      closable: true,
      modal: true,
      dismissableMask: true,
      styleClass: 'delete-dialog-container',
      data: { id },
    });

    this.ref.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getStudentsGroup(this.studentData.group?._id);
      }
    });
  }
}
