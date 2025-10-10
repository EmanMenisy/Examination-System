import { Component } from '@angular/core';
import { SharedModule } from '../../../../../../shared/shared.module';
import { InstructorService } from '../../../services/instructor.service';
import { IResult } from '../../../interfaces/IResult';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-result',
  imports: [SharedModule],
  templateUrl: './list-result.component.html',
  styleUrl: './list-result.component.scss'
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
        // this.results = [];
        response.map((item: any) => {
          if (item.quiz?.group) {
            this._instructorService.getGroupById(item.quiz.group).subscribe({
              next: (group) => {
                const updatedItem = {
                  ...item,
                  quiz: {
                    ...item.quiz,
                    group: group.name
                  }
                };
                this.results.push(updatedItem);
              }
            });
          } else {
            this.results.push(item);
          }
        });
      },
      error: (err) => console.error(err)
    });
  }



  goToView(participants: any) {
    this.router.navigate(['/dashboard/instructor/viewResultsInstructor']);
    localStorage.setItem('participants', JSON.stringify(participants));
  }
}
