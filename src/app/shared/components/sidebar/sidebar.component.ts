import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface IMenu {
  title: string;
  icon: string;
  menuLink: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false
})
export class SidebarComponent {
    private readonly _translate = inject(TranslateService);

  constructor() {
    this._translate.use('en');
  }
  expanded: boolean = true;

  toggleSidebar() {
    this.expanded = !this.expanded
  }

  menu: IMenu[] = [
    {
      menuLink: '/dashboard/home',
      title: 'sidebar.Dashboard',
      icon: 'pi pi-home fs-3'
    },
    {
      menuLink: '/dashboard/instructor/listGroup',
      title: 'sidebar.Groups',
      icon: 'pi pi-users fs-3'
    },
        {
      menuLink: '/dashboard/instructor/listStudent',
      title: 'sidebar.Students',
      icon: 'pi pi-chart-bar fs-3'
    },
    {
      menuLink: '/dashboard/instructor/quiz',
      title: 'sidebar.Quizzes',
      icon: 'pi pi-stopwatch fs-3'
    },
    {
      menuLink: '/dashboard/instructor/listResults',
      title: 'sidebar.Results',
      icon: 'pi pi-chart-bar fs-3'
    },
  ]
}
