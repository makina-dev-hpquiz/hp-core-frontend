import { Component, OnInit } from '@angular/core';
import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { ArtworkDaoService } from 'src/providers/dao/artwork-dao.service';
import { LectureDaoService } from 'src/providers/dao/lecture-dao.service';
import { QuestionDaoService } from 'src/providers/dao/question-dao.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.page.html',
  styleUrls: ['./lectures.page.scss'],
})
export class LecturesPage implements OnInit {

  public lectures: Lecture[];
  public artworks: Artwork[];
  public selectedArtwork: Artwork;

  constructor(private lectureDaoService: LectureDaoService, private artworkDaoService: ArtworkDaoService,
    private questionDaoService: QuestionDaoService) { }

  async ngOnInit() {
    this.artworks = new Array();
    this.lectures = new Array();
    this.selectedArtwork = new Artwork();

    await this.getArtworks();
    await this.getLectures();
  }

  /**
   * Réactualise la liste de lectures.
   */
  public async changeSelectedArtwork(){
    await this.getLectures();
  }

  /**
   * Récupère la liste des lectures
   */
  private async getLectures(){
    this.lectures = new Array();
    if(this.selectedArtwork.id) {
      this.lectures = await this.lectureDaoService.findAllByArtwork(this.selectedArtwork);
    } else {
      this.lectures = await this.lectureDaoService.findAll();
    }

    this.lectures.forEach(async (lecture) => {
      lecture.questions = await this.questionDaoService.findAllByLecture(lecture);
    });
  }

  /**
   * Récupère la liste des oeuvres
   */
  private async getArtworks(){
    this.artworks = await this.artworkDaoService.findAll();
  }

}
