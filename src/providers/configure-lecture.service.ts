import { Injectable } from '@angular/core';
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
    *
    * @returns Lecture
    */
   public getCurrentLecture(){
     return this.lecture;
   }

   /**
    * Initialise un nouvel object lecture
    *
    * @returns Lecture
    */
   public initializeNewLecture(){
      this.lecture = new Lecture();
      return this.lecture;
   }

   /**
    * Charge l'objet lecture avec la nouvelle fourni en paramètre
    *
    * @param lecture
    */
   public loadLecture(lecture: Lecture){
      this.lecture = lecture;
   }


  /**
   * Récupère depuis le service Dao la liste des oeuvres liées au type selectionné
   *
   * @returns List<string>
   */
  public async findArtworksByType(artworkType: ArtworkType): Promise<Artwork[]>{
    return await this.artworkDao.findAllArtworksByType(artworkType);
  }

  // async findAll() { TODO pour test
  //   return await this.artworkDao.findAll();
  // }

  /**
   * Transfert à la couche ArtworkDao, un objet Artwork à sauvegarder
   *
   * @param artwork
   */
  public async addArtwork(artwork: Artwork){
    return await this.artworkDao.saveArtwork(artwork);
  }

  public async updateArtwork(artwork: Artwork) {
    await this.artworkDao.updateArtwork(artwork);
  }

  /**
   * Transfert à la couche LectureDao, un objet lecture à sauvegarder
   */
   public async saveLecture(){
    this.lecture = await this.lectureDao.saveLecture(this.lecture);
    console.log('Lecture saved !', this.lecture);
  }

}
