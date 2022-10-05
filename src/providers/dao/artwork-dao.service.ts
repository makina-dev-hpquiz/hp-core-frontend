import { Injectable, OnInit } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Artwork } from 'src/entities/artwork';
import { DatabaseService } from '../database.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkDaoService {

  private table = 'artwork';

  private addRequest = 'INSERT INTO ' + this.table + ' (title, type) VALUES (?, ?);';
  private findAllByTypeRequest = 'SELECT * FROM ' + this.table+ ' WHERE type = ? ORDER BY id DESC';
  private findByTitleRequest = 'SELECT * FROM ' + this.table + ' WHERE title = ?'

  constructor(private databaseService: DatabaseService) { }

  private database: SQLiteObject;

  /**
   * Sauvegarde une entité lecture de la base de données
   */
  public async saveArtwork(artwork: Artwork) {
    console.log('ArtworkDaoService.saveArtwork : ', artwork.title, artwork.type);
    try {
      (await this.databaseService.getDatabase()).executeSql(this.addRequest, [artwork.title, artwork.type]);
    } catch (error) {
      console.log('Erreur saveArtwork ', error);
    }
    return await this.findArtworkByTitle(artwork);
  }

  /**
   * Retourne une liste d'artwork possédant le type fourni en paramètre
   *
   * @param type String
   * @returns Artwork[]
   */
  public async findAllArtworksByType(type: string): Promise<Artwork[]> {
    const artworks: Artwork[] = [];
    this.database = await this.databaseService.getDatabase();

    console.log('ArtworkDaoService.findAllArtworksByType');
    (await this.database.executeSql(this.findAllByTypeRequest, [type]).then(res => {
      for (let i = 0; i < res.rows.length; i++) {
        artworks.push(res.rows.item(i));
      }
    }));

    return artworks;
  }

  public async findArtworkByTitle(artwork: Artwork) {
    console.log('findArtwork ?', artwork.title);
   return  (await this.databaseService.getDatabase()).executeSql(this.findByTitleRequest, [artwork.title]).then(res =>
       res.rows.item(0) //TODO is Null?
    );
  }


}
