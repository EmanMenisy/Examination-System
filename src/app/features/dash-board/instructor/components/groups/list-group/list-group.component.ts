import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';
import { IGroup } from '../../../interfaces/IGroup';
import { SharedModule } from '../../../../../../shared/shared.module';
import { PaginatorState } from 'primeng/paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteGroupComponent } from '../delete-group/delete-group.component';
import { AddEditGroupComponent } from '../add-edit-group/add-edit-group.component';

@Component({
  selector: 'app-list-group',
  imports: [SharedModule],
  providers: [DialogService],
  templateUrl: './list-group.component.html',
  styleUrl: './list-group.component.scss',
  standalone: true
})
export class ListGroupComponent implements OnInit {
  groupList: IGroup[] = [];
  paginatedGroups: IGroup[] = [];
  first: number = 0;
  rows: number = 6;
  ref: DynamicDialogRef | undefined;
  constructor(private _instructorService: InstructorService, private dialogService: DialogService) { }



  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups() {
    this._instructorService.getAllGroup().subscribe({
      next: (res: any) => {
        this.groupList = res;
        this.updatePaginatedGroups();
      },
    });

  }

  // open dialog delete
  open(id: string) {
    this.ref = this.dialogService.open(DeleteGroupComponent, {
      header: 'Delete Group',
      width: '400px',
      closable: true
    });

    this.ref.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteGroup(id);
      }
    });
  }

  deleteGroup(id: string) {
    this._instructorService.DeleteGroup(id).subscribe({
      complete: () => {
        this.getAllGroups()
      },
    })
  }
  show() {
    this.ref = this.dialogService.open(AddEditGroupComponent, {
      width: '40rem',
      height: 'auto',
      contentStyle: { 'max-height': '500px', overflow: 'unset' },
      baseZIndex: 10000,
      breakpoints: "{ '1199px': '75vw', '575px': '90vw'}",
      modal: true,
      dismissableMask: true
    });
    this.ref.onClose.subscribe((result) => {
      if (result === 'success') {
        this.getAllGroups();
      }
    });
  }

  // pagination
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 6;
    this.updatePaginatedGroups();
  }

  updatePaginatedGroups() {
    this.paginatedGroups = this.groupList.slice(
      this.first,
      this.first + this.rows
    );
  }

  updateGroup(groupData: any) {
    this.ref = this.dialogService.open(AddEditGroupComponent, {
      data: {
        group: groupData
      },
      width: '40rem',
      height: 'auto',
      contentStyle: { 'max-height': '500px', overflow: 'unset' },
      baseZIndex: 10000,
      breakpoints: "{ '1199px': '75vw', '575px': '90vw'}",
      modal: true,
      dismissableMask: true
    });

    this.ref.onClose.subscribe((result) => {
      if (result === 'success') {
        this.getAllGroups();
      }
    })


  }


}
