import { Component } from '@angular/core';
import { DifficultyList, Difficulty } from 'src/models/enums/difficultyEnum';
import { TypeQuestionList, TypeQuestion } from 'src/models/enums/typeQuestionEnum';


@Component({
  selector: 'app-new-answer',
  templateUrl: 'newAnswer.page.html',
  styleUrls: ['newAnswer.page.scss']
})
export class NewAnswerPage {

  public TYPE_QUESTION;
  public QUESTION = "Question";
  public QCM = "QCM";
  public LEXICAL = "Lexical";
  public CHAUDRON = "Chaudron";
  public DEBAT = "Débat";
  public SPEECH = "Speech";
  public GAGE = "Gage";
  public VRAI_OU_FAUX = "Vrai ou faux";
  public AFFIRMATION = "Affirmation";

  // public FACILE = "FACILE";
  // public MOYEN = "MOYEN";
  // public DIFFICILE = "DIFFICILE";
  
  public questionsType;
  public selectedQuestion : String;
  public selectedDifficulty : String;
  public difficulties;



  constructor() { }

  ngOnInit() {
    this.questionsType = TypeQuestionList;
    this.difficulties = DifficultyList;
    
    this.TYPE_QUESTION = TypeQuestion;
    this.selectedQuestion = TypeQuestion.QUESTION;
    this.selectedDifficulty = Difficulty.MOYEN;
  }

  // public getQuestionType() {
  //   return [this.QUESTION, this.QCM, this.LEXICAL, this.CHAUDRON, this.DEBAT, this.SPEECH, this.GAGE, this.VRAI_OU_FAUX, this.AFFIRMATION];
  // }

  public questionTypeChange(event){
    this.selectedQuestion = event.detail.value;
  }

  public difficultyChange(event){
    console.log(event)
  }

}
