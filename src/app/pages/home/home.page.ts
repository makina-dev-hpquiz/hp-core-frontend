import { Component, OnInit } from '@angular/core';
import { Lecture } from 'src/entities/lecture';
import { LectureDaoService } from 'src/providers/dao/lecture-dao.service';


import { Difficulty, DifficultyList } from 'src/models/enums/difficultyEnum';
import { DatabaseService } from 'src/providers/database.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public questions;

  public difficulties: string[];
  public selectedDifficulty: String;
  public test: Lecture[];

  constructor(private lectureDao: LectureDaoService) {
    this.difficulties = DifficultyList;
    this.selectedDifficulty = Difficulty.FACILE;
   }

  async ngOnInit() {


    this.questions = [{nb : 13, type : 'Question'},
    {nb : 3, type : 'QCM'},
    {nb : 2, type : 'Lexical'},
    {nb : 1, type : 'Chaudron'},
    {nb : 2, type : 'Débat'},
    {nb : 1, type : 'Speech'},
    {nb : 3, type : 'Gage'},
    {nb : 3, type : 'Vrai ou faux'},
    {nb : 3, type : 'Affirmation'}
  ];

  }

  /**
   * Compte le nombre total de questions
   *
   * @returns number
   */
  public countNbOfAnswersForSelectedDifficulty(){
    let totalNbOfAnswers = 0;
   if(this.questions != undefined) {
    this.questions.forEach(question => {
      totalNbOfAnswers += question.nb;
    });
  }
    return totalNbOfAnswers;
  }

}
