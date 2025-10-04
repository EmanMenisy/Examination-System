import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';
import { IGroup } from '../../../interfaces/IGroup';
import { SharedModule } from '../../../../../../shared/shared.module';
import { PaginatorState } from 'primeng/paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteGroupComponent } from '../delete-group/delete-group.component';

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
  ref: DynamicDialogRef | undefined;

  constructor(private _instructorService: InstructorService, private dialogService: DialogService) { }


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


  // open dialog delete
  open(id:string) {
    this.ref = this.dialogService.open(DeleteGroupComponent, {
      header: 'Delete Group',
      width: '300px',
      closable: true
    });

    this.ref.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log("Group deleted!");
        this.deleteGroup(id);
      }
    });
  }

  deleteGroup(id:string) {
    this._instructorService.DeleteGroup(id).subscribe({
      next:(res)=>{
        console.log(res)
      },complete:()=> {
        this.getAll()
      },
    })
  }

  // pagination
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 6;
    this.updatePaginatedGroups();
  }

  updatePaginatedGroups() {
    this.paginatedGroups = this.groupList.slice(this.first, this.first + this.rows);
  }
}
