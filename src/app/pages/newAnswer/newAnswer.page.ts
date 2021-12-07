import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonTextarea } from '@ionic/angular';
import { DifficultyList, Difficulty } from 'src/models/enums/difficultyEnum';
import { TypeQuestionList, TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { QuestionModel } from 'src/models/question.model';
import { LectureService } from 'src/providers/lecture.service';


@Component({
  selector: 'app-new-answer',
  templateUrl: 'newAnswer.page.html',
  styleUrls: ['newAnswer.page.scss']
})
export class NewAnswerPage {

  @ViewChild('questionInput', {read: IonTextarea}) ionTextarea: IonTextarea;

  public updateState: Boolean;
  public duplicatedTitle: string;

  public TYPE_QUESTION;
  public questionsType;
  public difficulties;
  public qcmRep: string[];

  public question: QuestionModel;

  constructor(private route: ActivatedRoute, private router: Router, private lectureService: LectureService) {
    this.updateState = false;
    
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.updateState = this.router.getCurrentNavigation().extras.state.update;
        this.question = this.router.getCurrentNavigation().extras.state.question;
        if(this.question.type === TypeQuestion.QCM) {
          this.qcmRep = this.question.answer.split("/");
        } else {
          this.qcmRep = ["", "", "", ""];
        }

      }
    });
   }


  ngOnInit() {
    this.TYPE_QUESTION = TypeQuestion;

    this.questionsType = TypeQuestionList;
    this.difficulties = DifficultyList;
    this.duplicatedTitle = "";

    if(!this.updateState){
      this.createNewQuestion();
    }
  }

  /**
   * Créer une nouvelle question 
   */
  createNewQuestion(){
    this.updateState = false;
    this.question = new QuestionModel();
    this.question.type = TypeQuestion.QUESTION;
    this.question.difficulty = Difficulty.MOYEN;

    this.question.question = this.duplicatedTitle;
    this.duplicatedTitle = "";

    this.qcmRep = ["", "", "", ""];
    if(this.ionTextarea) {
      this.ionTextarea.setFocus();
    }
  }

  ionViewDidEnter(){
    this.ionTextarea.setFocus();
  }

  /**
   * Ajoute une question au lectureService, créer une nouvelle question.
   * RG Pour QCM, concat des différents champs avec un séparateur / La première réponse est la bonne.
   */
  addQuestion(){
    if(this.question.type === TypeQuestion.QCM) {
      this.question.answer = this.qcmRep[0]+"/"+this.qcmRep[1]+"/"+this.qcmRep[2]+"/"+this.qcmRep[3];
    }

    if(!this.updateState) {
      this.lectureService.addQuestion(this.question);
    }
    this.createNewQuestion();

  }

  addInGroup() {
    let navigationExtras: NavigationExtras = {
      state: {
        question: this.question
      }
    };
    this.router.navigate(['/tabs/groups'], navigationExtras);
  }

  /**
   * Duplique le titre de la question pour une utilisation ultérieur
   */
  duplicateTitle(){
    this.duplicatedTitle = this.question.question;
  }

}
