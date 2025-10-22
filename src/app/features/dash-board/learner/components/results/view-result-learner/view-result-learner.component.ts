import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { Router } from '@angular/router';
import { InstructorService } from '../../../../instructor/services/instructor.service';

@Component({
  selector: 'app-view-result',
  imports: [SharedModule],
  templateUrl: './view-result-learner.component.html',
  styleUrl: './view-result-learner.component.scss'
})
export class ViewResultComponent {
  participants: any[] = [];
  constructor(private _instructorService: InstructorService, private router: Router) { }

  ngOnInit() {
    this.participants = JSON.parse(localStorage.getItem('participantsLearner') || '[]');
  }


}
