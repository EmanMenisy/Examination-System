import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginatorModule } from 'primeng/paginator';
import { Message } from 'primeng/message';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // PrimeNG
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FloatLabelModule,
    MenuModule,
    ButtonModule,
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    InputNumberModule,
    AvatarModule,
    RippleModule,
    PaginatorModule,
    Message,
    DialogModule,
    TableModule,
    DynamicDialogModule,
    MultiSelectModule ,
    // Translate
    TranslateModule
  ],
  providers:[
    DialogService
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // PrimeNG
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FloatLabelModule,
    MenuModule,
    ButtonModule,
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    InputNumberModule,
    AvatarModule,
    RippleModule,
    Message,
    DialogModule,
    DynamicDialogModule,
    TableModule,
    PaginatorModule,   
    DynamicDialogModule,
    MultiSelectModule ,
    // Translate
    TranslateModule,

    // Components
    NavbarComponent,
    SidebarComponent,
  ],
  providers: [DialogService]
})
export class SharedModule { }
