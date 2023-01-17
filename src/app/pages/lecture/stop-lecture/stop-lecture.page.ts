import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LectureService } from 'src/providers/lecture.service';
import { Difficulty } from 'src/models/enums/difficultyEnum';
import { TypeQuestion } from 'src/models/enums/typeQuestionEnum';

@Component({
  selector: 'app-stop-lecture',
  templateUrl: './stop-lecture.page.html',
  styleUrls: ['./stop-lecture.page.scss'],
})
export class StopLecturePage implements OnInit {

  public nbQuestions: number;
  public nbQuestionPerDifficulty: number[];


  constructor(private router: Router, private lectureService: LectureService) {
   this.nbQuestionPerDifficulty = [0, 0, 0];
  }

  ionViewWillEnter(){
    this.nbQuestions = this.lectureService.questions.length;
    this.lectureService.questions.forEach(q => {
      switch (q.difficulty) {
        case Difficulty.facile:
          this.nbQuestionPerDifficulty[0]++;
          break;
        case Difficulty.moyen:
          this.nbQuestionPerDifficulty[1]++;
          break;
        case Difficulty.difficile:
          this.nbQuestionPerDifficulty[2]++;
          break;
      }
    });
  }

  ngOnInit() {
  }


  stopLecture() {
    this.router.navigate(['/']);

  }
}
