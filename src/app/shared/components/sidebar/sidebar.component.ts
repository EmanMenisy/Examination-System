import { Student } from './../../../features/dash-board/instructor/interfaces/IGroup';
import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface IMenu {
  title: string;
  icon: string;
  menuLink: string;
  isActive:boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false
})
export class SidebarComponent {
  private readonly _translate = inject(TranslateService);
  userRole: any
  constructor() {
    this._translate.use('en');

  }

  expanded: boolean = true;

  isInstructor(): boolean {
    this.userRole = localStorage.getItem('Role');
    return this.userRole === 'Instructor';
  }

  isStudent(): boolean {
    this.userRole = localStorage.getItem('Role');
    return this.userRole === 'Student';
  }

  toggleSidebar() {
    this.expanded = !this.expanded
  }


  menu: IMenu[] = [
    {
      title: 'sidebar.home',
      menuLink: '/dashboard/home',
      icon: 'pi pi-home fs-3',
      isActive: this.isInstructor() ||  this.isStudent()
    },
    {
      title: 'sidebar.Groups',
      menuLink: '/dashboard/instructor/listGroup',
      icon: 'pi pi-users fs-3',
      isActive: this.isInstructor()
    },
    {
      title: 'sidebar.Students',
      menuLink: '/dashboard/instructor/listStudent',
      icon: 'pi pi-user fs-3',
      isActive: this.isInstructor()
    },
    {
      title: 'sidebar.Quizzes',
      menuLink: '/dashboard/instructor/quiz',
      icon: 'pi pi-stopwatch fs-3',
      isActive: this.isInstructor()
    },
     {
      title: 'sidebar.Quizzes',
      menuLink: '/dashboard/learner/viewQuiz',
      icon: 'pi pi-stopwatch fs-3',
      isActive: this.isStudent()
    },
    {
      title: 'sidebar.Results',
      menuLink: '/dashboard/instructor/listResultsInstructor',
      icon: 'pi pi-chart-bar fs-3',
      isActive: this.isInstructor()
    },
    {
      title: 'sidebar.Results',
      menuLink: '/dashboard/learner/listResults',
      icon: 'pi pi-chart-bar fs-3',
      isActive: this.isStudent()
    },
  ];
}
