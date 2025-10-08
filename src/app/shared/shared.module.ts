import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 🌟 PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { StepperModule } from 'primeng/stepper';

// 🌍 Translation
import { TranslateModule } from '@ngx-translate/core';

// 🧩 Shared Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Message } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RadioButtonModule } from 'primeng/radiobutton';
 

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AutoCompleteModule,
    ReactiveFormsModule,

    // ✅ PrimeNG imports
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    InputTextModule,
    DropdownModule,
    PasswordModule,
    MenuModule,
    AvatarModule,
    RippleModule,
    PaginatorModule,
    TableModule,
     MultiSelectModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    InputNumberModule,
    AvatarModule,
    RippleModule,
    Message,
    DialogModule,
    TableModule,
    DynamicDialogModule,
    TextareaModule,
    DatePickerModule,
    BreadcrumbModule,
    StepperModule,
    RadioButtonModule,
    
    // Translate
    MessageModule,

    // 🌍 Translate
    TranslateModule
  ],
  exports: [
    // Angular basics
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // ✅ PrimeNG exports
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    MenuModule,
    AvatarModule,
    RippleModule,
    PaginatorModule,
    TableModule,
    MultiSelectModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
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
    DynamicDialogModule,
    TextareaModule,
    DatePickerModule,
    BreadcrumbModule,
    StepperModule,
    RadioButtonModule,
    // Translate
    MessageModule,

    // 🌍 Translate
    TranslateModule,

    // Components
    NavbarComponent,
    SidebarComponent
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService
  ]
})
export class SharedModule { }
