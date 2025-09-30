import { Component, signal } from '@angular/core';
interface IMenu {
  title: string;
  icon: string;
  menuLink: string;
}
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss',
  standalone: false
})
export class DashBoardComponent {
  expanded: boolean = true;

  toggleSidebar() {
    this.expanded = !this.expanded
  }

  menu: IMenu[] = [
    {
      menuLink: '/dashboard/home',
      title: 'Dashboard',
      icon: 'pi pi-home fs-3'
    },
    {
      menuLink: '/test',
      title: 'Groups',
      icon: 'pi pi-users fs-3'
    },
    {
      menuLink: '/test',
      title: 'Quizzes',
      icon: 'pi pi-stopwatch fs-3'
    },
    {
      menuLink: '/test',
      title: 'Results',
      icon: 'pi pi-chart-bar fs-3'
    },
        {
      menuLink: '/test',
      title: 'Help',
      icon: 'pi pi-question-circle fs-3'
    }
  ]
}
