import { Istudents } from './../../Interfaces/istudents';
import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../Services/students.service';
import { SharedModule } from '../../../../../shared/shared.module';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-list-students',
  imports: [SharedModule],
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit {
  students: Istudents[] = [];            // all data
  paginatedStudents: Istudents[] = [];   // data for current page

  studentImages: string[] = [
    '/images/user img (1).png',
    '/images/user img.png'
  ];

  loading: boolean = true;
  rows: number = 8;       // students per page
  first: number = 0;      // paginator offset

  // menu state
  menuItems: MenuItem[] = [];
  selectedStudent!: Istudents;

  constructor(private myService: StudentsService) {}

  Fetcher() {
    this.myService.GetterWithout().subscribe({
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

  ngOnInit(): void {
    this.Fetcher();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedStudents();
  }

  private updatePaginatedStudents() {
    this.paginatedStudents = this.students.slice(this.first, this.first + this.rows);
  }

  // open actions menu
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
        command: () => this.onDelete(this.selectedStudent)
      }
    ];

    menu.toggle(event);
  }

  onEdit(student: Istudents) {
    console.log('Edit student:', student);
    }

  onDelete(student: Istudents) {
    console.log('Delete student:', student);
     }
}
