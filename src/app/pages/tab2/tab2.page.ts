import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
