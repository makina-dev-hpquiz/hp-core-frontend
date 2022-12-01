import { Injectable, OnInit } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Artwork } from 'src/entities/artwork';
import { DatabaseService } from '../database.service';
import { AbstractDaoService } from './abstract-dao.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkDaoService extends AbstractDaoService {


  private table = 'artwork';

  private addRequest = 'INSERT INTO ' + this.table + ' (title, type) VALUES (?, ?);';
  private updateRequest = 'UPDATE '+this.table+' SET title = ?, type = ? WHERE id = ?;';
  private findAllByTypeRequest = 'SELECT * FROM ' + this.table + ' WHERE type = ? ORDER BY id DESC;';
  private findByTitleRequest = 'SELECT * FROM ' + this.table + ' WHERE title = ?;';
  private findAllRequest = 'SELECT * FROM ' + this.table + ';';
  private findAll2Request = 'SELECT * FROM ' + this.table + ' JOIN lecture (' + this.table + '.id=lecture.id) ORDER BY lecture.date DESC'; //TODO

  private database: SQLiteObject;

  constructor(private databaseService: DatabaseService) {
    super();
  }

  async init() {
    this.database = await this.databaseService.getDatabase();
  }


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
   * Met à jour l'entité Artwork en BDD
   *
   * @param artwork
   */
  async updateArtwork(artwork: Artwork) {
    console.log('ArtworkDaoService.updateArtwork : ', artwork.id, artwork.title, artwork.type);
    try {
      (await this.databaseService.getDatabase()).executeSql(this.updateRequest, [artwork.title, artwork.type, artwork.id]);
    } catch (error) {
      console.log('Erreur updateArtwork ', error);
    }
  }

  /**
   * Retourne une liste d'artwork possédant le type fourni en paramètre
   *
   * @param type String
   * @returns Artwork[]
   */
  public async findAllArtworksByType(type: string): Promise<Artwork[]> {
    let artworks: Artwork[] = [];
    console.log('ArtworkDaoService.findAllArtworksByType ' + this.findAllByTypeRequest);
    await (await this.databaseService.getDatabase()).executeSql(this.findAllByTypeRequest, [type]).then(res => {
      artworks = this.extractResultSet(res);
    });

    return artworks;
  }

  public async findArtworkByTitle(artwork: Artwork) {
    console.log('findArtwork ?', artwork.title);
    return (await this.databaseService.getDatabase()).executeSql(this.findByTitleRequest, [artwork.title]).then(res =>
      res.rows.item(0) //TODO is Null?
    );
  }

  public async findAll() {
    console.log('ArtworkDaoService.findAll : ' + this.findAllRequest);
    let artworks: Artwork[] = [];
    await (await this.databaseService.getDatabase()).executeSql(this.findAllRequest, []).then(res => {
      artworks = this.extractResultSet(res);
    });

    return artworks;
  }
}
