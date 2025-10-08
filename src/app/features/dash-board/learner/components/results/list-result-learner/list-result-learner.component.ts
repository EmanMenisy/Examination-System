import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { Router } from '@angular/router';
import { InstructorService } from '../../../../instructor/services/instructor.service';
import { IResult } from '../../../../instructor/interfaces/IResult';

@Component({
  selector: 'app-list-result',
  imports: [SharedModule],
  templateUrl: './list-result-learner.component.html',
  styleUrl: './list-result-learner.component.scss'
})
export class ListResultComponent {

  constructor(private _instructorService: InstructorService, private router: Router) { }
  results: IResult[] = [];
  ngOnInit(): void {
    this.getAllResults();
  }

  getAllResults(): void {
    this._instructorService.getAllResults().subscribe({
      next: (response) => {
        this.results = response;
        console.log('Results fetched:', this.results);
      }
    });
  }


  goToView(participants: any) {
      localStorage.setItem('participantsLearner', JSON.stringify(participants));
    this.router.navigate(['/dashboard/learner/viewResults']);
  }
}
