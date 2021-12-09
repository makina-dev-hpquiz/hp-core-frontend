import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common'; 
import { TypeArtwork } from 'src/models/enums/typeArtworkEnum';




@Component({
  selector: 'app-configure-lecture',
  templateUrl: './configure-lecture.page.html',
  styleUrls: ['./configure-lecture.page.scss'],
})
export class ConfigureLecturePage {

  //CONST 
  public typeArtwork;
  //DATA
  public currentDate;
  public currentDateToDisplay: String;
  public selectedArtworkType;
  public selectedArtwork;
  public artworksList: Array<String>;

  constructor() { 
    this.currentDate = new Date();

    registerLocaleData(localeFr, 'fr');
    this.currentDateToDisplay = formatDate( this.currentDate,'dd/MM/yyyy HH:mm:ss', 'fr');
    this.typeArtwork = TypeArtwork;
    this.selectedArtworkType = this.typeArtwork.LIVRE;
    this.artworksList = new Array();
    this.getArtworkByArtworkType();
    this.selectedArtwork ="";
  }

  /**
   * Lorsque le type sélectionné dans la liste déroulante Type d'oeuvre change,
   * On met à jour la liste des oeuvres associées au type
   */
  public selectedTypeChange(){
    this.selectedArtwork ="";
    this.getArtworkByArtworkType();
  }

  /**
   * Récupère les oeuvres associées au type selectionné
   * et les placent dans la liste affichée
   */
  private getArtworkByArtworkType(){
    // TODO Service gestion des oeuvres
    this.artworksList = new Array();
    switch(this.selectedArtworkType){
      case TypeArtwork.LIVRE :
        this.artworksList.push("HP Livre 1 : Ecole des sorciers");
        this.artworksList.push("HP Livre 2 : Chambre des secrets");
        break;
      case TypeArtwork.FILM : 
        this.artworksList.push("OSS 117");
      break;
    }
  }

  /**
   * Retourne le texte pour le label demandant à quel page commence la lecture
   * @returns String
   */
  public displayTextStartLecture(){
    switch(this.selectedArtworkType){
      case TypeArtwork.LIVRE :
        return "Votre lecture du livre "+this.selectedArtwork+" commence à la page combien?";
      case TypeArtwork.SERIE : 
        return "Votre visionnage de la série "+this.selectedArtwork+"  commence à l'épisode combien?"
    }
  }

  /**
   * Ouvre une petite fenêtre dans l'objectif de créer une nouvelle oeuvre avec le type sélectionné
   */
  public newArtwork(){
    let newArtwork = prompt("Nom du nouvelle oeuvre de type "+this.selectedArtworkType, "");
    if(newArtwork) {
      this.selectedArtwork = newArtwork;
      this.artworksList.push(this.selectedArtwork);
    }
  }

}
