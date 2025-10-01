import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
//PrimeNG Modules
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslateModule } from '@ngx-translate/core';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AvatarModule, 
    RippleModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
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
    TranslateModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    AvatarModule,
     RippleModule,
    FloatLabelModule,
    ButtonModule,
    PasswordModule,
    MenuModule,
    NavbarComponent,
    SidebarComponent,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    InputNumberModule,
    TranslateModule,


  ],
})
export class SharedModule { }
