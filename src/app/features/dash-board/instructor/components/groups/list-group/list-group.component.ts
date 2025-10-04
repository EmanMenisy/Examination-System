import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';
import { IGroup } from '../../../interfaces/IGroup';
import { SharedModule } from '../../../../../../shared/shared.module';
import { PaginatorState } from 'primeng/paginator';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
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
  rows: number = 10;
  ref: DynamicDialogRef | undefined;

  constructor(
    private _instructorService: InstructorService,
    public dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.getAllGroups();
  }
  getAllGroups() {
    this._instructorService.getAll().subscribe({
      next: (res: any) => {
        this.groupList = res;
        console.log(this.groupList);
        this.updatePaginatedGroups();
      },
    });

  }

  //open dialoge
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

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
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
        group :groupData
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
