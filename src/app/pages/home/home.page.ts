import { Component, OnInit } from '@angular/core';
import { Lecture } from 'src/entities/lecture';
import { LectureDaoService } from 'src/providers/dao/lecture-dao.service';


import { Difficulty, difficultyList } from 'src/models/enums/difficultyEnum';
import { DatabaseService } from 'src/providers/database.service';
import { ArtworkModel } from 'src/models/artwork.model';
import { ArtworkDaoService } from 'src/providers/dao/artwork-dao.service';
import { Artwork } from 'src/entities/artwork';
import { DateUtils } from 'src/utils/date-utils';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public questions;

  public artworksList: ArtworkModel[];

  public difficulties: string[];
  public selectedDifficulty: string;
  public test: Lecture[];

  constructor(private lectureDao: LectureDaoService, private artworkDao: ArtworkDaoService) {
    this.difficulties = difficultyList;
    this.selectedDifficulty = Difficulty.facile; 
  }


  async ngOnInit() {
    this.artworksList = new Array();
    this.questions = [{ nb: 13, type: 'Question' },
    { nb: 3, type: 'QCM' },
    { nb: 2, type: 'Lexical' },
    { nb: 1, type: 'Chaudron' },
    { nb: 2, type: 'Débat' },
    { nb: 1, type: 'Speech' },
    { nb: 3, type: 'Gage' },
    { nb: 3, type: 'Vrai ou faux' },
    { nb: 3, type: 'Affirmation' }
    ];
  }

  async ionViewDidEnter() {
    await this.getArtworks();
    this.sortByRecent();
  }

  /**
   * Compte le nombre total de questions
   *
   * @returns number
   */
  public countNbOfAnswersForSelectedDifficulty() { //TODO
    let totalNbOfAnswers = 0;
    if (this.questions !== undefined) {
      this.questions.forEach(question => {
        totalNbOfAnswers += question.nb;
      });
    }
    return totalNbOfAnswers;
  }

  public async getArtworks() {
    this.artworksList = new Array();

    const artworks =  await this.artworkDao.findAll();
    for(let i = 0; i < artworks.length; i++){
      const lectures = await this.lectureDao.findAllByArtwork(artworks[i]);
      const artworkM =  new ArtworkModel(artworks[i]);
      artworkM.setLectures(lectures);
      this.artworksList.push(artworkM);
    }
  }

  private sortByRecent(){
    this.artworksList.sort((a,b) =>
    DateUtils.compare(a.dateRecentLecture.toISOString(), b.dateRecentLecture.toISOString()));

  }


}
