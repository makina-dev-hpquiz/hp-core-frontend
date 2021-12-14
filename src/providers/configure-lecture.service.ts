import { Injectable } from '@angular/core';
import { ArtworkModel } from 'src/models/artwork.model';
import { ArtworkType } from 'src/models/enums/typeArtworkEnum';
import { Lecture } from 'src/entities/lecture';
import { LectureDaoService } from './dao/lecture-dao.service';
import { ArtworkDaoService } from './dao/artwork-dao.service';
import { Artwork } from 'src/entities/artwork';

@Injectable({
  providedIn: 'root'
})
export class ConfigureLectureService {

  private lecture: Lecture;

  constructor(private lectureDao: LectureDaoService, private artworkDao: ArtworkDaoService) {
   }

   /**
    * Transmet la lecture courante à un autre service
    * @returns Lecture
    */
   getCurrentLecture(){
     return this.lecture;
   }

   /**
    * Initialise un nouvel object lecture
    * @returns Lecture
    */
   initializeNewLecture(){
      this.lecture = new Lecture();
      return this.lecture
   }
  

  /**
   * Récupère depuis le service Dao la liste des oeuvres liées au type selectionné 
   * @returns List<string>
   */
  async findArtworkByType(artworkType: ArtworkType) : Promise<Artwork[]>{
    return await this.artworkDao.findAllArtworksByType(artworkType);
  }

  /**
   * Transfert à la couche ArtworkDao, un objet Artwork à sauvegarder
   * @param artwork 
   */
  async addArtwork(artwork: Artwork){
    return await this.artworkDao.saveArtwork(artwork);
  }

  /**
   * Transfert à la couche LectureDao, un objet lecture à sauvegarder
   */
  saveLecture(){
    this.lectureDao.saveLecture(this.lecture);
  }
}
