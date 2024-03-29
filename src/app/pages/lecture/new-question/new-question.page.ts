import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonAccordionGroup, IonTextarea } from '@ionic/angular';
import { Question } from 'src/entities/question';
import { difficultyList, Difficulty } from 'src/models/enums/difficultyEnum';
import { typeQuestionList, TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { LectureService } from 'src/providers/lecture.service';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ToasterService } from 'src/providers/toaster.service';

@Component({
  selector: 'app-new-question',
  templateUrl: 'new-question.page.html',
  styleUrls: ['new-question.page.scss']
})
export class NewQuestionPage implements OnInit {

  @ViewChild('questionTitleInput', { read: IonTextarea }) questionTitleInput: IonTextarea;
  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;

  public updateState: boolean;
  public title: string;
  public typeQuestion;
  public questionsType;
  public difficulties;
  public qcmRep: string[];

  public question: Question;

  private readonly titleNewQuestion = 'Lecture - Nouvelle question';
  private readonly titleUpdateQuestion = 'Lecture - Mise à jour question';

  constructor(private route: ActivatedRoute, private router: Router, private lectureService: LectureService,
    private screenOrientation: ScreenOrientation, private toasterService: ToasterService) {
    this.changeStatePage();

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const initialize = this.router.getCurrentNavigation().extras.state.initialize;
        if(initialize) {
          this.lectureService.initialize();
          this.createNewQuestion();
        } else {
          this.title = this.titleUpdateQuestion;
          this.closeAccordion();
          this.updateState = this.router.getCurrentNavigation().extras.state.update;
          this.question = Object.assign({}, this.router.getCurrentNavigation().extras.state.question);
          if (this.question.type === TypeQuestion.qcm) {
            this.qcmRep = this.question.answer.split('/');
          } else {
            this.qcmRep = ['', '', '', ''];
          }
        }
      } else {
        this.createNewQuestion();
      }
    });
  }

  public ngOnInit() {
    this.typeQuestion = TypeQuestion;
    this.questionsType = typeQuestionList;
    this.difficulties = difficultyList;
  }

  public ionViewDidEnter() {
    this.screenOrientation.unlock();
    this.questionTitleInput.setFocus();
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
   * Ajoute une question au lectureService, créer une nouvelle question.
   * RG Pour QCM, concat des différents champs avec un séparateur / La première réponse est la bonne.
   */
  public async addQuestion() {
    await this.saveQuestion();
    if (this.questionIsValid() && !this.updateState) {
      this.createNewQuestion();
    }
  }

  /**
   * L'application navigue vers l'écran Groups en sélectionnant la question actuelle
   */
  public async addInGroup() {
    if (this.questionIsValid()) {
      await this.saveQuestion();
      const navigationExtras: NavigationExtras = {
        state: {
          question: this.question
        }
      };
      await this.router.navigate(['/tabs/groups'], navigationExtras);
      this.createNewQuestion();
    }
  }

  /**
   * Duplique le titre de la question pour une utilisation ultérieur
   */
  public async duplicate() {
    await this.saveQuestion();
    if (this.updateState) {
      this.changeStatePage();
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
      if(this.updateState) {
        await this.lectureService.updateQuestion(this.question);
        (await this.toasterService.getSuccessToast('La question a été mis à jour !')).present();
      } else {
        await this.lectureService.addQuestion(this.question);
        (await this.toasterService.getSuccessToast('La question a été sauvegardé !')).present();
      }
    } else {
      await (await this.toasterService.getDangerToast('La question n\'a pas pu être sauvegardé !')).present();
    }

  }

  /**
   * Créer une nouvelle question
   */
  private createNewQuestion() {
    this.changeStatePage();
    this.question = new Question();

    this.question.lecture = this.lectureService.lecture;
    this.question.type = TypeQuestion.question;
    this.question.difficulty = Difficulty.moyen;

    this.qcmRep = ['', '', '', ''];
    if (this.questionTitleInput) {
      this.questionTitleInput.setFocus();
    }

    this.closeAccordion();
  }

  /**
   * Ferme l'accordeon
   * TODO No Test
   */
  private closeAccordion(){
    if(this.accordionGroup) {
      this.accordionGroup.value= undefined;
    }
  }

  /**
   * Change l'état de la page en état de création.
   */
  private changeStatePage(){
      this.updateState = false;
      this.title = this.titleNewQuestion;
  }
}
