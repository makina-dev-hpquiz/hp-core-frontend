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

@Component({
  selector: 'app-configure-lecture',
  templateUrl: './configure-lecture.page.html',
  styleUrls: ['./configure-lecture.page.scss'],
})
export class ConfigureLecturePage implements OnInit{

  //CONST
  public typesArtwork;

  //DATA
  public lecture: Lecture;

  public currentDateToDisplay: String;
  public selectedArtworkType: ArtworkType;
  public selectedArtwork: Artwork;
  public artworksList: Artwork[];


  constructor(private router: Router, private configureLecture: ConfigureLectureService) {
    this.lecture = configureLecture.initializeNewLecture();

    registerLocaleData(localeFr, 'fr');
    this.currentDateToDisplay = formatDate(this.lecture.date, 'dd/MM/yyyy HH:mm:ss', 'fr');

    this.typesArtwork = ArtworkType;
    this.selectedArtworkType = this.typesArtwork.BOOK;
    this.selectedArtwork = new Artwork();

    this.artworksList = new Array();
  }

  async ngOnInit(): Promise<void> {
    await this.getArtworksByArtworkType();
  }


  /**
   * Lorsque le type sélectionné dans la liste déroulante Type d'oeuvre change,
   * On met à jour la liste des oeuvres associées au type
   */
  public async selectedTypeChange() {
    this.selectedArtwork = new Artwork();
    await this.getArtworksByArtworkType();
  }


  /**
   * Retourne le texte pour le label demandant à quel page commence la lecture
   *
   * @returns String
   */
  public displayTextStartLecture() {
    switch (this.selectedArtworkType) {
      case ArtworkType.BOOK:
        return 'Votre lecture du livre ' + this.selectedArtwork.title + ' commence à la page combien?';
      case ArtworkType.SERIE:
        return 'Votre visionnage de la série ' + this.selectedArtwork.title + ' commence à l\'épisode combien?';
    }
  }

  /**
   * Ouvre une petite fenêtre dans l'objectif de créer une nouvelle oeuvre avec le type sélectionné
   */
  public async newArtwork() {
    const newArtwork = prompt('Nom du nouvelle oeuvre de type ' + this.selectedArtworkType, '');
    if (newArtwork) {
      this.selectedArtwork = await this.configureLecture.addArtwork(
        new Artwork(newArtwork, this.selectedArtworkType));
      console.log('Selected Artwork : ', this.selectedArtwork.id, this.selectedArtwork.title);
      
      this.artworksList = await this.configureLecture.findArtworksByType(this.selectedArtworkType);
      this.selectedArtwork = this.artworksList.find(artwork => artwork.id === this.selectedArtwork.id);
    }
  }

  /**
   * Lance la lecture, enregistre en base, initialise le service de lecture et
   * l'utilisateur est envoyé vers l'écran new question
   */
  public async startLecture() {
    if(this.selectedArtwork.title) {
      this.lecture.artwork = this.selectedArtwork;
      await this.configureLecture.saveLecture();
      this.router.navigate(['/tabs/']);
    }
  }

  /**
   * Récupère les oeuvres associées au type selectionné
   * et les placent dans la liste affichée
   */
   private async getArtworksByArtworkType() {
    this.artworksList = await this.configureLecture.findArtworksByType(this.selectedArtworkType);
  }

  /**
   * Renvoi à l'écran d'accueil
   */
  public backHome(){
    this.router.navigate(['/']);
  }

}
