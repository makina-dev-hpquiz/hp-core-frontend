import { Injectable } from '@angular/core';
import { ArtworkModel } from 'src/models/artwork.model';
import { ArtworkType } from 'src/models/enums/typeArtworkEnum';
import { Lecture } from 'src/entities/lecture';
import { LectureDaoService } from './dao/lecture-dao.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigureLectureService {

  private lecture: Lecture;

  constructor(private lectureDao: LectureDaoService) {
   }


   initializeNewLecture(){
      this.lecture = new Lecture();
      return this.lecture
   }

   /**
    * Initialise puis renvoi une lecture
   */
  getLecture(){
    if(!this.lecture) {
      this.initializeNewLecture();
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
    this.lectureDao.saveLecture(this.lecture);
  }
}
