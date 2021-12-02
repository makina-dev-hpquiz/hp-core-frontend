import { Component } from '@angular/core';

@Component({
  selector: 'app-new-answer',
  templateUrl: 'newAnswer.page.html',
  styleUrls: ['newAnswer.page.scss']
})
export class NewAnswerPage {

  public questionsType;
  public difficulties;

  constructor() { }

  ngOnInit() {
    this.questionsType = this.getQuestionType();
    this.difficulties = this.getDifficulties();
  }

  public getQuestionType() {
    return ["Question", "QCM", "Lexical", "Chaudron", "Débat", "Speech", "Gage", "Vrai ou faux", "Affirmation"];
  }

  public getDifficulties(){
    return  ["FACILE", "MOYEN", "DIFFICILE"];
  }

  public questionTypeChange(event){
    console.log(event);
  }

  public difficultyChange(event){
    console.log(event)
  }

}
