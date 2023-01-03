import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LectureService } from 'src/providers/lecture.service';

import { TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { Question } from 'src/entities/Question';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-list-questions',
  templateUrl: 'list-questions.page.html',
  styleUrls: ['list-questions.page.scss']
})
export class ListQuestionsPage implements OnInit {

  public title = 'Lecture - Lister les questions';
  public questions: Question[];
  public keyword: string;

  constructor(private router: Router, private lectureService: LectureService,
    private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    this.questions = this.lectureService.questions;
    this.keyword = '';
  }

  ionViewWillEnter() {

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    if (this.keyword === '') {
      this.questions = this.lectureService.questions;
    }
    this.sortQuestions();

  }
  /**
   * Ouvre le détail de la question cliqué
   *
   * @param question
   */
  public goToDetail(question: Question) {
    const navigationExtras: NavigationExtras = {
      state: {
        update: true,
        question
      }
    };
    this.router.navigate(['/tabs/detail'], navigationExtras);
  }


  /**
   * Retourne le premier caractère de la chaîne fourni en paramètre.
   * Attention pas de distinction entre Question : Q et QCM : Q
   *
   * @param typeName string
   * @returns string
   */
  public getMiniNameType(typeName: string) {

    if (typeName === TypeQuestion.qcm) {
      return 'Qc';
    } else {
      return typeName.substring(0, 1).toUpperCase();
    }
  }

  /**
   * Filtre la liste de questions en fonction de la phrase écrite dans le searchInput
   */
  public filter() {
    this.questions = this.lectureService.questions.filter(q => q.question.toLowerCase().includes(this.keyword.toLowerCase()));
    this.sortQuestions();
  }

  /**
   * trie les questions par date de plus récentes à plus anciennes.
   */
  private sortQuestions() {
    if (this.questions.length > 1) {
      this.questions = this.questions.sort((q1, q2) =>
        (new Date(q1.isUpdated) > new Date(q2.isUpdated)) ? -1 : (new Date(q1.isUpdated) < new Date(q2.isUpdated)) ? 1 : 0
      );
    }
  }
}
