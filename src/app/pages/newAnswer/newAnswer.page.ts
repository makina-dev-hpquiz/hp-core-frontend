import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
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

  public TYPE_QUESTION;
  public questionsType;
  public difficulties;
  public qcmRep: string[];

  public question: QuestionModel;

  constructor(private lectureService: LectureService) { }

  ngOnInit() {
    this.questionsType = TypeQuestionList;
    this.difficulties = DifficultyList;
    
    this.TYPE_QUESTION = TypeQuestion;

    this.createNewQuestion();
  }

  /**
   * Créer une nouvelle question 
   */
  createNewQuestion(){
    this.question = new QuestionModel();
    this.question.type = TypeQuestion.QUESTION;
    this.question.difficulty = Difficulty.MOYEN;

    this.qcmRep = ["", "", "", ""];
  }

  /**
   * Ajoute une question au lectureService, créer une nouvelle question.
   * RG Pour QCM, concat des différents champs avec un séparateur / La première réponse est la bonne.
   */
  addQuestion(){
    if(this.question.type === TypeQuestion.QCM) {
      this.question.answer = this.qcmRep[0]+"/"+this.qcmRep[1]+"/"+this.qcmRep[2]+"/"+this.qcmRep[3];
    }

    this.lectureService.addQuestion(this.question);
    this.createNewQuestion();

  }

}
