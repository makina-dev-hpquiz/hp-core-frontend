import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ArtworkType } from 'src/models/enums/typeArtworkEnum';
import { Router } from '@angular/router';
import { ConfigureLectureService } from 'src/providers/configure-lecture.service';
import { Lecture } from 'src/entities/lecture';
import { ArtworkModel } from 'src/models/artwork.model'; //TODO
import { Artwork } from 'src/entities/artwork';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-configure-lecture',
  templateUrl: './configure-lecture.page.html',
  styleUrls: ['./configure-lecture.page.scss'],
})
export class ConfigureLecturePage implements OnInit {

  //CONST
  public typesArtwork;

  //DATA
  public lecture: Lecture;

  public currentDateToDisplay: string;
  public selectedArtworkType: ArtworkType;
  public selectedArtwork: Artwork;
  public artworksList: Artwork[];

  private bookDisplayStartText = 'Votre lecture du livre :? commence à la page :';
  private serieDisplayStartText = 'Votre visionnage de la série :? commence à l\'épisode :';
  private movieDisplayStartText = 'Votre film ou lecture audio :? commence à la minute :';
  private replaceValue = ':?';

  constructor(private router: Router, private configureLecture: ConfigureLectureService, private screenOrientation: ScreenOrientation) {

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.lecture = configureLecture.initializeNewLecture();

    registerLocaleData(localeFr, 'fr');
    this.currentDateToDisplay = formatDate(this.lecture.date, 'dd/MM/yyyy HH:mm:ss', 'fr');

    this.typesArtwork = ArtworkType;
    this.selectedArtworkType = this.typesArtwork.book;
    this.selectedArtwork = new Artwork();

    this.artworksList = new Array();
  }

  async ngOnInit(): Promise<void> {
    await this.getArtworksAndSelectFirst();
  }


  /**
   * Lorsque le type sélectionné dans la liste déroulante Type d'oeuvre change,
   * On met à jour la liste des oeuvres associées au type
   * Reinitialise l'artwork Sélectionnée
   */
  public async selectedTypeChange() {
    this.selectedArtwork = new Artwork();
    await this.getArtworksAndSelectFirst();
    this.resetStartLecture();
  }


  /**
   * Retourne le texte pour le label demandant à quel page commence la lecture
   *
   * @returns String
   */
  public displayTextStartLecture() {
    switch (this.selectedArtworkType) {
      case ArtworkType.book:
        return this.bookDisplayStartText.replace(this.replaceValue, this.selectedArtwork.title);
      case ArtworkType.serie:
        return this.serieDisplayStartText.replace(this.replaceValue, this.selectedArtwork.title);
      case ArtworkType.movie:
        return this.movieDisplayStartText.replace(this.replaceValue, this.selectedArtwork.title);
    }
  }

  /**
   * Ouvre un popup permettant de créer une nouvelle oeuvre avec le type sélectionné
   */
  public async newArtwork() {
    const newArtwork = prompt('Nom du nouvelle oeuvre de type ' + this.selectedArtworkType, '');
    if (newArtwork) {
      this.selectedArtwork = await this.configureLecture.addArtwork(
        new Artwork(newArtwork, this.selectedArtworkType));
      console.log('Selected Artwork : ', this.selectedArtwork.id, this.selectedArtwork.title);
      await this.getArtworksAndSelectFirst();
    }
  }

  /**
   * Ouvre un popup permettant de mettre à jour le titre d'une oeuvre.
   */
  public async updateArtwork() {
    const updateArtwork = prompt('Mettre à jour le nom de l\'oeuvre ' + this.selectedArtwork.title, this.selectedArtwork.title);
    if (updateArtwork) {
      this.selectedArtwork.title = updateArtwork;
      await this.configureLecture.updateArtwork(this.selectedArtwork);
      await this.refreshArtworkList();
    }
  }



  /**
   * Lance la lecture, enregistre en base, initialise le service de lecture et
   * l'utilisateur est envoyé vers l'écran new question
   */
  public async startLecture() {
    if (this.selectedArtwork.title) {
      this.lecture.artwork = this.selectedArtwork;
      await this.configureLecture.saveLecture();
      await this.router.navigate(['/tabs/']);
    }
  }


  /**
   * Renvoi à l'écran d'accueil
   */
  public async backToHome() {
    await this.router.navigate(['/']);
  }

  /**
   * Reset la valeur de startPage de l'entité Lecture
   */
  public resetStartLecture() {
    this.lecture.startPage = '';
  }

  /**
   * Raffraichît la liste et resélectionne l'artwork
   */
  private async refreshArtworkList() {
    await this.getArtworksByArtworkType();
    this.selectedArtwork = await this.artworksList.find(artwork => artwork.id === this.selectedArtwork.id);
  }

  /**
   * Récupère les oeuvres associées au type selectionné
   * et les placent dans la liste affichée
   */
  private async getArtworksByArtworkType() {
    this.artworksList = await this.configureLecture.findArtworksByType(this.selectedArtworkType);
  }

  /**
   * Récupère les oeuvres associées au type selectionné
   * et les placent dans la liste affichée, le premier élélement de la liste devient l'artwork sélectionné.
   */
  private async getArtworksAndSelectFirst() {
    await this.getArtworksByArtworkType();
    await this.selectFirstArtwork();
  }

  /**
   * Sélectionne le premier artwork de la liste
   */
  private async selectFirstArtwork() {
    if (this.artworksList && this.artworksList.length > 0) {
      this.selectedArtwork = this.artworksList[0];
    }
  }


}
