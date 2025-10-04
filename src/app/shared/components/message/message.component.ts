import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-message',
  imports: [MessageModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() control!: AbstractControl | null;
  @Input() error!: string;
  @Input() text: string = '';
  @Input() severity: 'success' | 'error' | 'warn' | 'info' = 'error';
  @Input() variant: 'simple' | 'outlined' = 'simple';
  @Input() size: 'small' | 'large' | undefined = undefined;

  showError(): boolean {
    return !!this.control && this.control.hasError(this.error) && (this.control.dirty || this.control.touched);
  }
}
