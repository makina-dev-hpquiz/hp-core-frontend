import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonTextarea } from '@ionic/angular';
import { Question } from 'src/entities/Question';
import { DifficultyList, Difficulty } from 'src/models/enums/difficultyEnum';
import { TypeQuestionList, TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { LectureService } from 'src/providers/lecture.service';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-new-answer',
  templateUrl: 'newAnswer.page.html',
  styleUrls: ['newAnswer.page.scss']
})
export class NewAnswerPage  implements OnInit{

  @ViewChild('questionTitleInput', { read: IonTextarea }) questionTitleInput: IonTextarea;

  public updateState: Boolean;
  public duplicatedTitle: string;

  public TYPE_QUESTION;
  public questionsType;
  public difficulties;
  public qcmRep: string[];

  public question: Question;

  constructor(private route: ActivatedRoute, private router: Router, private lectureService: LectureService,
    private screenOrientation: ScreenOrientation) {

    this.screenOrientation.unlock();
    this.updateState = false;

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.updateState = this.router.getCurrentNavigation().extras.state.update;
        this.question = this.router.getCurrentNavigation().extras.state.question;
        if (this.question.type === TypeQuestion.QCM) {
          this.qcmRep = this.question.answer.split('/');
        } else {
          this.qcmRep = ['', '', '', ''];
        }

      }
    });
  }

  ngOnInit() {
    this.lectureService.initialize();

    this.TYPE_QUESTION = TypeQuestion;

    this.questionsType = TypeQuestionList;
    this.difficulties = DifficultyList;
    this.duplicatedTitle = '';

    if (!this.updateState) {
      this.createNewQuestion();
    }
  }

  /**
   * Créer une nouvelle question
   */
  createNewQuestion() {
    this.updateState = false;
    this.question = new Question();

    this.question.lecture = this.lectureService.lecture;
    this.question.type = TypeQuestion.QUESTION;
    this.question.difficulty = Difficulty.MOYEN;

    this.question.question = this.duplicatedTitle;
    this.duplicatedTitle = '';

    this.qcmRep = ['', '', '', ''];
    if (this.questionTitleInput) {
      this.questionTitleInput.setFocus();
    }
  }

  ionViewDidEnter() {
    this.questionTitleInput.setFocus();
  }

  /**
   * Ajoute une question au lectureService, créer une nouvelle question.
   * RG Pour QCM, concat des différents champs avec un séparateur / La première réponse est la bonne.
   */
  addQuestion() {
    if (this.question.type === TypeQuestion.QCM) {
      this.question.answer = this.qcmRep[0] + '/' + this.qcmRep[1] + '/' + this.qcmRep[2] + '/' + this.qcmRep[3];
    }
    if (this.questionIsValid()) {
      this.lectureService.addQuestion(this.question);
      this.createNewQuestion();
    }

  }

  /**
   * L'application navigue vers l'écran Groups en sélectionnant la question actuelle
   */
  addInGroup() {
    if (this.questionIsValid()) {
      const navigationExtras: NavigationExtras = {
        state: {
          question: this.question
        }
      };
      this.router.navigate(['/tabs/groups'], navigationExtras);
    }
  }

  /**
   * Duplique le titre de la question pour une utilisation ultérieur
   */
  duplicateTitle() {
    this.duplicatedTitle = this.question.question;
  }

   /**
    * Indique si une question possède à un minimat un titre
    *
    * @returns Boolean
    */
    private questionIsValid(){
      return this.question.question !== '' ? true : false;
  }
}
