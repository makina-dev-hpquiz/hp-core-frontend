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
  public async changeSelectedArtwork() {
    await this.getLectures();
  }

  public displayDate(date: Date) {
    return date.toDateString();
  }

  /**
   * Récupère la liste des lectures
   */
  private async getLectures() {
    this.lectures = new Array();
    if (this.selectedArtwork.id) {
      this.lectures = await this.lectureDaoService.findAllByArtwork(this.selectedArtwork);
    } else {
      this.lectures = await this.lectureDaoService.findAll();
    }

    this.sortLectures();
    this.getQuestions();
  }

  /**
   * Tri la liste des lectures de la plus récente à la plus ancienne
   */
  private sortLectures() {
    this.lectures.sort((lecture1, lecture2) => new Date(lecture2.date).getTime() - new Date(lecture1.date).getTime());
  }

  /**
   * Récupère et associe les questions aux lectures
   */
  private async getQuestions() {
    this.lectures.forEach(async (lecture) => {
      lecture.questions = await this.questionDaoService.findAllByLecture(lecture);
    });
  }

  /**
   * Récupère la liste des oeuvres et ajoute une oeuvre vide en tête de la liste
   */
  private async getArtworks() {
    const artworkList = await this.artworkDaoService.findAll();
    this.artworks = new Array(new Artwork());
    artworkList.forEach(artwork => {
      this.artworks.push(artwork);
    });
  }
}
