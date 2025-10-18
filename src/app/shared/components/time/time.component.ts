import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { EventEmitter } from 'node:stream';
import { StudentQuizService } from '../../../features/dash-board/learner/service/student-quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  standalone: false,
})
export class TimeComponent implements OnInit, OnDestroy {
  @Input() durationMinutes!: number;
  remainingTime!: number;
  interval: any;
  sub!: Subscription;

  constructor(private studentQuizService: StudentQuizService) {}

  ngOnInit() {

    this.startCountdown();
    const savedEndTime = localStorage.getItem('quizEndTime');

    if (savedEndTime) {
      const remaining = Math.floor((+savedEndTime - Date.now()) / 1000);
      this.remainingTime = remaining > 0 ? remaining : 0;
    } else {
      const durationInSeconds = this.durationMinutes * 60;
      const endTime = Date.now() + durationInSeconds * 1000;
      localStorage.setItem('quizEndTime', endTime.toString());
      this.remainingTime = durationInSeconds;
    }


    this.sub = this.studentQuizService.examSubmit.subscribe((submitted) => {
      if (submitted) {
        this.stopCountdown();
        localStorage.removeItem('quizEndTime');
      }
    });
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.stopCountdown();
        localStorage.removeItem('quizEndTime');
        this.studentQuizService.triggerExamSubmit();
      }
    }, 1000);
  }

  stopCountdown() {
    clearInterval(this.interval);
    localStorage.removeItem('quizEndTime');
  }

  get minutes() {
    return Math.floor(this.remainingTime / 60);
  }

  get seconds() {
    return this.remainingTime % 60;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.sub?.unsubscribe();
  }
}
