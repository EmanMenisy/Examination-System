import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { Router } from '@angular/router';
import { InstructorService } from '../../../../instructor/services/instructor.service';
import { IResult } from '../../../../instructor/interfaces/IResult';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-result',
  imports: [SharedModule],
  templateUrl: './list-result-learner.component.html',
  styleUrl: './list-result-learner.component.scss'
})
export class ListResultComponent {
  constructor(private _instructorService: InstructorService, private router: Router , private TranslateService: TranslateService) { }

  results: IResult[] = [];
  currentLang: string = 'en';

  ngOnInit(): void {
    this.getAllResults();
        this.TranslateService.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }

  getAllResults(): void {
    this._instructorService.getAllResults().subscribe({
      next: (response) => {
        this.results = response;
      }
    });
  }


  goToView(participants: any) {
      localStorage.setItem('participantsLearner', JSON.stringify(participants));
    this.router.navigate(['/dashboard/learner/viewResults']);
  }
}
