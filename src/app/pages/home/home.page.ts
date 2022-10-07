import { Component, OnInit } from '@angular/core';
import { Lecture } from 'src/entities/lecture';
import { LectureDaoService } from 'src/providers/dao/lecture-dao.service';


import { Difficulty, DifficultyList } from 'src/models/enums/difficultyEnum';
import { DatabaseService } from 'src/providers/database.service';
import { ArtworkModel } from 'src/models/artwork.model';
import { ArtworkDaoService } from 'src/providers/dao/artwork-dao.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public questions;

  public artworksList: ArtworkModel[];

  public difficulties: string[];
  public selectedDifficulty: String;
  public test: Lecture[];
  
  constructor(private lectureDao: LectureDaoService, private artworkDao: ArtworkDaoService) {
    this.difficulties = DifficultyList;
    this.selectedDifficulty = Difficulty.FACILE;
   }


  async ngOnInit() {    
    this.artworksList = new Array();
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

  async ionViewDidEnter(){
    await this.getArtworks();
   }

  /**
   * Compte le nombre total de questions
   *
   * @returns number
   */
  public countNbOfAnswersForSelectedDifficulty(){ //TODO
    let totalNbOfAnswers = 0;
   if(this.questions != undefined) {
    this.questions.forEach(question => {
      totalNbOfAnswers += question.nb;
    });
  }
    return totalNbOfAnswers;
  }

  public async getArtworks(){
    this.artworksList = new Array();
    await this.artworkDao.findAll().then(artworks => {
      artworks.forEach(artwork => {
        this.artworksList.push(new ArtworkModel(artwork))
      });

    })
  }

}
