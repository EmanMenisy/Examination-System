import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { StudentsService } from '../../Services/students.service';
import { Istudents } from '../../Interfaces/istudents';
import { IGroup } from '../../../instructor/interfaces/IGroup';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteStudentsComponent } from '../delete-students/delete-students.component';
import { AddEditStudentComponent } from '../add-edit-students/add-edit-students.component';


@Component({
  selector: 'app-list-students',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
  providers: [DialogService],
})
export class ListStudentsComponent implements OnInit, OnDestroy {

  groups: IGroup[] = [];
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

  studentImages: string[] = [
    '/images/user img (1).png',
    '/images/user img.png'
  ];

  constructor(
    private studentsService: StudentsService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getGroups();
    this.getAllStudents();
  }

  ngOnDestroy(): void {
    if (this.ref) this.ref.close();
  }

  getGroups(): void {
    this.studentsService.Groups().subscribe({
      next: (res) => (this.groups = res),
      error: (err) => console.error('Error loading groups:', err),
    });
  }

  getAllStudents(): void {
    this.loading = true;
    this.studentsService.GetterWithout().subscribe({
      next: (res) => {
        console.log(res);
        this.students = res;
        this.filterStudents();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        this.loading = false;
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
      header: action === 'add' ? 'Add Student' : 'Edit Student',
      width: '500px',
      data: { action, student },
    });

    this.ref.onClose.subscribe((updated) => {
      if (updated) this.getAllStudents();
    });
  }

  showDeleteDialog(id: string): void {
    this.ref = this.dialogService.open(DeleteStudentsComponent, {
      header: 'Confirm Delete',
      width: '350px',
      closable: true,
      modal: true,
      dismissableMask: true,
      data: { id },
    });

    this.ref.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) this.getAllStudents();
    });
  }
}
