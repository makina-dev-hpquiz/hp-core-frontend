import { Injectable } from '@angular/core';
import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureDaoService {

  constructor() {   }

  /**
   * Supprime l'entité lecture fourni en paramètre de la base de données
   */
  public async removeLecture(lecture: Lecture) {
    // if (lecture) {
    //   await getRepository(Lecture).remove(lecture);
    // }
  }

  /**
   * Sauvegarde une entité lecture de la base de données
   */
  public async saveLecture(lecture: Lecture) {
    // try {
    //   return await getRepository(Lecture).save(lecture);
    // } catch (error) {
    //   console.log('LectureDaoService - saveLecture : La sauvegarde a echoué' + error);
    // }
  }

  /**
   * Retourne une liste de lecture
   *
   * @returns Lecture[]
   */
  public async findAllLectures(): Promise<Lecture[]> {
    // return await getRepository(Lecture).find({ order: { id: "DESC"} });
    return null;
  }

  public async findAllByArtwork(artwork: Artwork): Promise<Lecture[]> {
    
    return null;
  } 

}
