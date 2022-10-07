import { Injectable } from '@angular/core';
import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { DatabaseService } from '../database.service';
import { AbstractDaoService } from './abstract-dao.service';

@Injectable({
  providedIn: 'root'
})
export class LectureDaoService extends AbstractDaoService{
  private table = 'lecture';

  private addRequest = 'INSERT INTO ' + this.table + ' (date, start, end, is_progress, artwork_id) VALUES (?, ?, ?, ?, ?);';
  private findAllByArtworkRequest = 'SELECT * FROM '+this.table+' WHERE artwork_id = ?;';

  constructor(private databaseService: DatabaseService) {
    super();
  }

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
    try {
      (await this.databaseService.getDatabase()).executeSql(
        this.addRequest, [lecture.date, lecture.startPage, lecture.endPage, lecture.isInProgress, lecture.artwork.id]);
    } catch (error) {
      console.log('Erreur saveLecture ', error);
    }
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
    console.log('ArtworkDaoService.findAllByArtwork : '+this.findAllByArtworkRequest, artwork.id);
    let lectures: Lecture[] = [];
    await (await this.databaseService.getDatabase()).executeSql(this.findAllByArtworkRequest, [artwork.id]).then(res => {
      lectures = this.extractResultSet(res);
    });
    return lectures;
  }

}
