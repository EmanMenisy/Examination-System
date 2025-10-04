import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { InstructorService } from '../../../services/instructor.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IStudent } from '../../../../Interfaces/home';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-group',
  imports: [SharedModule],
  templateUrl: './add-edit-group.component.html',
  styleUrl: './add-edit-group.component.scss',
  standalone: true
})
export class AddEditGroupComponent implements OnInit {
  StudentsList: any = [];
  selectedCities: any;
  selectedIds:string[]=[];
  data:any;
  currentLang = 'en'
  constructor(
    private _InstructorService: InstructorService,
    private _ToastrService: ToastrService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig ,
    private _TranslateService:TranslateService
  ) {}
  ngOnInit(): void {
    this.currentLang = this._TranslateService.currentLang ?? this._TranslateService.getDefaultLang() ?? 'en';
    this._TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('Language changed to:', event.lang);
      this.currentLang = event.lang;
    });

    this.getAllStudents();
    this.updatedData();
  }

   addGroupForm = new FormGroup({
      name: new FormControl('' , [Validators.required]), 
      students:new FormControl([], [Validators.required])
    });

  AddNewGroup() {
    if(this.config.data){
      this._InstructorService.updateGroup(this.config.data.group._id ,this.addGroupForm.value).subscribe({
        next:(res)=>{
       this._ToastrService.success('your group has been updated scuccessfully');
        },
       complete: () => {
        this.ref.close('success'); 
       },
      })
    }
    
    else{
     this._InstructorService.createGroup(this.addGroupForm.value).subscribe({
      next: (res) => {
       this._ToastrService.success('your group has been addedd scuccessfully');
      },
      complete: () => {
        this.ref.close('success'); 
      },
    });
    }
   
  }

  getAllStudents() {
    this._InstructorService.getAllStudents().subscribe({
      next: (res) => {
       this.StudentsList= res.filter(s=>s.group==null || this.selectedIds.includes(s._id));
       console.log(this.StudentsList);
       
      },
    });
  }

  close() {
    this.ref.close();
  }

  updatedData(){
    if (this.config && this.config.data) {
     this.data =  this.config.data.group
     this.selectedIds=this.data.students;
     this.addGroupForm.patchValue({
      name: this.data.name,
      students: this.data.students
    });
  }
}
}
