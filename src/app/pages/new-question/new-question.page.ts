import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonTextarea } from '@ionic/angular';
import { Question } from 'src/entities/Question';
import { difficultyList, Difficulty } from 'src/models/enums/difficultyEnum';
import { typeQuestionList, TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { LectureService } from 'src/providers/lecture.service';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-new-question',
  templateUrl: 'new-question.page.html',
  styleUrls: ['new-question.page.scss']
})
export class NewQuestionPage  implements OnInit{

  @ViewChild('questionTitleInput', { read: IonTextarea }) questionTitleInput: IonTextarea;

  public updateState: boolean;
  public duplicatedTitle: string;

  public typeQuestion;
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
        if (this.question.type === TypeQuestion.qcm) {
          this.qcmRep = this.question.answer.split('/');
        } else {
          this.qcmRep = ['', '', '', ''];
        }

      }
    });
  }

  ngOnInit() {
    this.lectureService.initialize();

    this.typeQuestion = TypeQuestion;

    this.questionsType = typeQuestionList;
    this.difficulties = difficultyList;
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
    this.question.type = TypeQuestion.question;
    this.question.difficulty = Difficulty.moyen;

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
    if (this.question.type === TypeQuestion.qcm) {
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
      //TODO Sauvegarde en bdd
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
    //TODO A développer
    this.duplicatedTitle = this.question.question;
  }

   /**
    * Indique si une question possède à un minimat un titre
    *
    * @returns Boolean
    */
    private questionIsValid(){
      //TODO Manque this.question.answer !== '' ? true : false;
      return this.question.question? true : false;
  }
}
