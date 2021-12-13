import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ArtworkType } from 'src/models/enums/typeArtworkEnum';
import { Router } from '@angular/router';
import { ConfigureLectureService } from 'src/providers/configure-lecture.service';
import { Lecture } from 'src/entities/lecture';
import { ArtworkModel } from 'src/models/artwork.model';




@Component({
  selector: 'app-configure-lecture',
  templateUrl: './configure-lecture.page.html',
  styleUrls: ['./configure-lecture.page.scss'],
})
export class ConfigureLecturePage {

  //CONST 
  public typeArtwork;

  //DATA
  public lecture: Lecture;

  public currentDateToDisplay: String;
  public selectedArtworkType: ArtworkType;
  public selectedArtwork: ArtworkModel;
  public artworksList: Array<ArtworkModel>;

  constructor(private router: Router, private configureLecture: ConfigureLectureService) {
    this.lecture = configureLecture.getLecture();

    registerLocaleData(localeFr, 'fr');
    this.currentDateToDisplay = formatDate(this.lecture.date, 'dd/MM/yyyy HH:mm:ss', 'fr');

    this.typeArtwork = ArtworkType;
    this.selectedArtworkType = this.typeArtwork.LIVRE;
    this.artworksList = new Array();
    this.getArtworkByArtworkType();
    this.selectedArtwork = new ArtworkModel();
  }

  /**
   * Lorsque le type sélectionné dans la liste déroulante Type d'oeuvre change,
   * On met à jour la liste des oeuvres associées au type
   */
  public selectedTypeChange() {
    this.selectedArtwork = new ArtworkModel();
    this.getArtworkByArtworkType();
  }


  /**
   * Retourne le texte pour le label demandant à quel page commence la lecture
   * @returns String
   */
  public displayTextStartLecture() {
    switch (this.selectedArtworkType) {
      case ArtworkType.LIVRE:
        return "Votre lecture du livre " + this.selectedArtwork.title + " commence à la page combien?";
      case ArtworkType.SERIE:
        return "Votre visionnage de la série " + this.selectedArtwork.title + "  commence à l'épisode combien?"
    }
  }

  /**
   * Ouvre une petite fenêtre dans l'objectif de créer une nouvelle oeuvre avec le type sélectionné
   */
  public newArtwork() {
    let newArtwork = prompt("Nom du nouvelle oeuvre de type " + this.selectedArtworkType, "");
    if (newArtwork) {

      this.selectedArtwork = new ArtworkModel(newArtwork, this.selectedArtworkType);
      this.artworksList.push(this.selectedArtwork);
    }
  }

  /**
   * Lance la lecture, enregistre en base, initialise le service de lecture et
   * l'utilisateur est envoyé vers l'écran new question
   */
  public startLecture() {
    this.lecture.livre = this.selectedArtwork.title;
    this.configureLecture.saveLecture();
    this.router.navigate(['/tabs/']);
  }

  /**
   * Récupère les oeuvres associées au type selectionné
   * et les placent dans la liste affichée
   */
  private getArtworkByArtworkType() {
    // TODO Service gestion des oeuvres

    this.artworksList = this.configureLecture.findArtworkByType(this.selectedArtworkType);



    // this.artworksList = new Array<ArtworkModel>();
    // switch(this.selectedArtworkType){
    //   case ArtworkType.LIVRE :
    //     this.artworksList.push(new ArtworkModel("HP Livre 1 : Ecole des sorciers",  ArtworkType.LIVRE));
    //     this.artworksList.push(new ArtworkModel("HP Livre 2 : Chambre des secrets", ArtworkType.LIVRE));
    //     break;
    //   case ArtworkType.FILM : 
    //     this.artworksList.push(new ArtworkModel("OSS 117", ArtworkType.FILM));
    //   break;
  }


}
