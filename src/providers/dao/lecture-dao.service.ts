import { Injectable } from '@angular/core';
import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { DatabaseService } from '../database.service';
import { AbstractDaoService } from './abstract-dao.service';
import { ArtworkDaoService } from './artwork-dao.service';

@Injectable({
  providedIn: 'root'
})
export class LectureDaoService extends AbstractDaoService {
  private table = 'lecture';

  private addRequest = 'INSERT INTO ' + this.table + ' (date, start, end, is_progress, artwork_id) VALUES (?, ?, ?, ?, ?);';
  private findAllByArtworkRequest = 'SELECT * FROM ' + this.table + ' WHERE artwork_id = ?;';
  private findByDateRequest = 'SELECT * FROM ' + this.table + ' WHERE date = ?;';
  private findAllRequest = 'SELECT * FROM ' + this.table + ';';

  constructor(private databaseService: DatabaseService, private artworkDaoService: ArtworkDaoService) {
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
   * Et la restitue grâce à sa date
   */
  public async saveLecture(lecture: Lecture) {
    try {
      console.log('LectureDaoService.saveLecture : ' + this.addRequest);
      (await this.databaseService.getDatabase()).executeSql(
        this.addRequest, [lecture.date, lecture.startPage, lecture.endPage, lecture.isInProgress, lecture.artwork.id]);

      return await this.findByDate(lecture);
    } catch (error) {
      console.log('Erreur saveLecture ', error);
    }
  }

  /**
   * Retourne une liste de lecture
   *
   * @returns Lecture[]
   */
  public async findAll(): Promise<Lecture[]> {
    console.log('LectureDaoService.findAll: ' + this.findAllRequest);
    let lectures: Lecture[] = [];
    await (await this.databaseService.getDatabase()).executeSql(this.findAllRequest, []).then(async res => {
      lectures = await this.extractResultSet(res);
    });
    return lectures;
  }

  /**
   * Retourne une liste de lecture associée à l'oeuvre fourni en paramètre
   *
   * @param artwork : Artwork
   * @returns Lecture[]
   */
  public async findAllByArtwork(artwork: Artwork): Promise<Lecture[]> {
    console.log('LectureDaoService.findAllByArtwork : ' + this.findAllByArtworkRequest, artwork.id);
    let lectures: Lecture[] = [];
    await (await this.databaseService.getDatabase()).executeSql(this.findAllByArtworkRequest, [artwork.id]).then(async res => {
      lectures = await this.extractResultSet(res);
    });
    return lectures;
  }

  /**
   *
   * @param res
   * @returns
   */
  protected async extract(res: any) {
    const lecture = new Lecture();
    lecture.id = res.id;
    lecture.date = res.date;
    lecture.startPage = res.start;
    lecture.endPage = res.end;
    lecture.isInProgress = res.is_progress;

    const artwork = new Artwork();
    artwork.id = res.artwork_id;
    lecture.artwork = artwork;

    lecture.artwork = await this.getArtwork(lecture);

    return lecture;
  }

  /**
   * Récupère l'entité Lecture grâce à sa date
   *
   * @param lecture
   */
  private async findByDate(lecture: Lecture): Promise<Lecture> {
    return (await this.databaseService.getDatabase()).executeSql(this.findByDateRequest, [lecture.date]).then(res =>
      this.extract(res.rows.item(0))
    );
  }

  /**
   * Appel le service ArtworkDaoService pour récupérer un objet artwork associé à la lecture courrante
   *
   * @param lecture
   * @returns
   */
  private async getArtwork(lecture: Lecture) {
    return await this.artworkDaoService.findById(lecture.artwork);
  }
}
