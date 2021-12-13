import { Injectable } from '@angular/core';
import { Lecture } from 'src/entities/lecture';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable({
  providedIn: 'root'
})
export class LectureDaoService {

  private lectureRepository : Repository<Lecture>;

  constructor() {
    this.lectureRepository = getRepository(Lecture);

   }

  /**
     * Supprime l'entité lecture fourni en paramètre de la base de données
     */
  public async removeLecture(lecture: Lecture) {
    if (lecture) {
      await this.lectureRepository.remove(lecture);
    }
  }

  /**
     * Sauvegarde une entité lecture de la base de données
     */
  public async saveLecture(lecture: Lecture) {
    try {
      return await this.lectureRepository.save(lecture);
    } catch (error) {
      console.log('LectureDaoService - saveLecture : La sauvegarde a echoué' + error);
    }
  }

  /**
   * Retourne une liste de lecture
   * @returns Lecture[]
   */
  public async findAllLectures(): Promise<Lecture[]> {
    return await this.lectureRepository.find();
  }

}
