import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { InstructorService } from '../../../services/instructor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-result',
  imports: [SharedModule],
  templateUrl: './view-result.component.html',
  styleUrl: './view-result.component.scss'
})
export class ViewResultComponent {
  participants: any[] = [];
  constructor(private _instructorService: InstructorService, private router: Router) { }

  ngOnInit() {
    this.participants = JSON.parse(localStorage.getItem('participants') || '[]');
  }


}
