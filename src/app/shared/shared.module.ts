import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
//PrimeNG Modules
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    IconFieldModule,
    InputIconModule,

 
  ],
  exports:[
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    IconFieldModule,
    InputIconModule,
  ]
})
export class SharedModule { }
