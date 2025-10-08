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
      title: 'Home',
      menuLink: '/dashboard/home',
      icon: 'pi pi-home fs-3',
      isActive: this.isInstructor() ||  this.isStudent()
    },
    {
      title: 'Groups',
      menuLink: '/dashboard/instructor/listGroup',
      icon: 'pi pi-users fs-3',
      isActive: this.isInstructor()
    },
    {
      title: 'Students',
      menuLink: '/dashboard/instructor/listStudent',
      icon: 'pi pi-chart-bar fs-3',
      isActive: this.isInstructor()
    },
    {
      title: 'Quizzes',
      menuLink: '/dashboard/instructor/quiz',
      icon: 'pi pi-stopwatch fs-3',
      isActive: this.isInstructor()
    },
     {
      title: 'Quizzes',
      menuLink: '/dashboard/learner/viewQuiz',
      icon: 'pi pi-stopwatch fs-3',
      isActive: this.isStudent()
    },
    {
      title: 'Results',
      menuLink: '/dashboard/instructor/listResults',
      icon: 'pi pi-chart-bar fs-3',
      isActive: this.isInstructor()
    },
       {
      title: 'Results',
      menuLink: '/dashboard/learner/viewQuiz',
      icon: 'pi pi-chart-bar fs-3',
      isActive: this.isStudent()
    },
  ];
}
