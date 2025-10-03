import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';
import { IGroup } from '../../../interfaces/IGroup';
import { SharedModule } from '../../../../../../shared/shared.module';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-list-group',
  imports: [SharedModule],

  templateUrl: './list-group.component.html',
  styleUrl: './list-group.component.scss'
})
export class ListGroupComponent implements OnInit {
  groupList: IGroup[] = []
  paginatedGroups: IGroup[] = [];
  first: number = 0;
  rows: number = 6

  constructor(private _instructorService: InstructorService) { }
  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this._instructorService.getAll().subscribe({
      next: (res: any) => {
        this.groupList = res
        console.log(this.groupList)
            this.updatePaginatedGroups();
      }
    })
  }



  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 6;
    this.updatePaginatedGroups();
  }

  updatePaginatedGroups() {
    this.paginatedGroups = this.groupList.slice(this.first, this.first + this.rows);
  }
}
