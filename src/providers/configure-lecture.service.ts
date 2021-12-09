import { Injectable } from '@angular/core';
import { ArtworkModel } from 'src/models/artwork.model';
import { ArtworkType } from 'src/models/enums/typeArtworkEnum';
import { LectureModel } from 'src/models/lecture.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigureLectureService {

  private lecture: LectureModel;

  constructor() {
   }

   /**
    * Initialise puis renvoi une lecture
   */
  getLecture(){
    if(!this.lecture) {
      this.lecture = new LectureModel();
    }

    return this.lecture;
  }
  

  /**
   * Récupère en bdd ??? 
   * @returns List<string>
   */
  findArtworkByType(artworkType: ArtworkType){
    return Array<ArtworkModel>();
  }

  addArtwork(artwork: ArtworkModel){
    // Call couche DAO
  }

  saveLecture(){
    // Call couche DAO
  }
}
