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
export class NewQuestionPage implements OnInit {

  @ViewChild('questionTitleInput', { read: IonTextarea }) questionTitleInput: IonTextarea;

  public updateState: boolean;

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

  public ngOnInit() {
    this.typeQuestion = TypeQuestion;

    this.questionsType = typeQuestionList;
    this.difficulties = difficultyList;

    if (!this.updateState) {
      this.lectureService.initialize();
      this.createNewQuestion();
    }
  }

  /**
   * Réinitialise les valeurs questions/réponses lors du changement de type
   */
  public typeChange(){
    this.question.question = '';
    this.question.answer = '';
    this.qcmRep = ['', '', '', ''];
  }

  /**
   * Créer une nouvelle question
   */
  public createNewQuestion() { //TODO Private?
    this.updateState = false;
    this.question = new Question();

    this.question.lecture = this.lectureService.lecture;
    this.question.type = TypeQuestion.question;
    this.question.difficulty = Difficulty.moyen;

    this.qcmRep = ['', '', '', ''];
    if (this.questionTitleInput) {
      this.questionTitleInput.setFocus();
    }
  }

  public ionViewDidEnter() {
    this.questionTitleInput.setFocus();
  }

  /**
   * Ajoute une question au lectureService, créer une nouvelle question.
   * RG Pour QCM, concat des différents champs avec un séparateur / La première réponse est la bonne.
   */
  public async addQuestion() {
    this.saveQuestion();
    if (this.questionIsValid()) {
      this.createNewQuestion();
    }
  }

  /**
   * L'application navigue vers l'écran Groups en sélectionnant la question actuelle
   */
  public addInGroup() {
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
  public duplicate() {
    if (this.updateState) {
    } else {
      this.saveQuestion();
    }
  }

  /**
   * Indique si une question est valide, elle doit disposer :
   * D'une question, d'une réponse, d'un type et d'une difficulté
   *
   * @returns Boolean
   */
  public questionIsValid() {
    return (this.question.type && this.question.difficulty && this.question.question &&
      this.question.answer && this.question.type !== TypeQuestion.qcm) ||
   ((this.question.type === TypeQuestion.chaudron ||
    this.question.type === TypeQuestion.debat ||
    this.question.type === TypeQuestion.gage ||
    this.question.type === TypeQuestion.speech) && this.question.question && this.question.difficulty) ||
    (this.question.type === TypeQuestion.qcm  && this.question.difficulty && this.question.question &&
    this.qcmRep[0] && this.qcmRep[1] && this.qcmRep[2] && this.qcmRep[3]) ? true : false;
  }

  /**
   * Appel le service d'enregistrement en BDD d'une question dans le cas ou celle ci est valide.
   */
  private async saveQuestion() {
    if (this.question.type === TypeQuestion.qcm) {
      this.question.answer = this.qcmRep[0] + '/' + this.qcmRep[1] + '/' + this.qcmRep[2] + '/' + this.qcmRep[3];
    }
    if (this.questionIsValid()) {
      await this.lectureService.addQuestion(this.question);
    }
  }
}
