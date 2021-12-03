import { Component } from '@angular/core';

@Component({
  selector: 'app-new-answer',
  templateUrl: 'newAnswer.page.html',
  styleUrls: ['newAnswer.page.scss']
})
export class NewAnswerPage {

  public QUESTION = "Question";
  public QCM = "QCM";
  public LEXICAL = "Lexical";
  public CHAUDRON = "Chaudron";
  public DEBAT = "Débat";
  public SPEECH = "Speech";
  public GAGE = "Gage";
  public VRAI_OU_FAUX = "Vrai ou faux";
  public AFFIRMATION = "Affirmation";

  public FACILE = "FACILE";
  public MOYEN = "MOYEN";
  public DIFFICILE = "DIFFICILE";
  
  public questionsType;
  public selectedQuestion : String;
  public selectedDifficulty : String;
  public difficulties;



  constructor() { }

  ngOnInit() {
    this.questionsType = this.getQuestionType();
    this.difficulties = this.getDifficulties();

    this.selectedQuestion = this.questionsType[0];
    this.selectedDifficulty = this.MOYEN;
  }

  public getQuestionType() {
    return [this.QUESTION, this.QCM, this.LEXICAL, this.CHAUDRON, this.DEBAT, this.SPEECH, this.GAGE, this.VRAI_OU_FAUX, this.AFFIRMATION];
  }

  public getDifficulties(){
    return  [this.FACILE, this.MOYEN, this.DIFFICILE];
  }

  public questionTypeChange(event){
    this.selectedQuestion = event.detail.value;
  }

  public difficultyChange(event){
    console.log(event)
  }

}
