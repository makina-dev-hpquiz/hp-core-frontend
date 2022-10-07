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
  private findAllByTypeRequest = 'SELECT * FROM ' + this.table+ ' WHERE type = ? ORDER BY id DESC;';
  private findByTitleRequest = 'SELECT * FROM ' + this.table + ' WHERE title = ?;';
  private findAllRequest = 'SELECT * FROM '+this.table+';';
  private findAll2Request = 'SELECT * FROM '+this.table+' JOIN lecture ('+this.table+'.id=lecture.id) ORDER BY lecture.date DESC'; //TODO

  constructor(private databaseService: DatabaseService) { 
    // this.init();
  }

  async init(){
    this.database = await this.databaseService.getDatabase();
  }

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
    let artworks: Artwork[] = [];
    console.log('ArtworkDaoService.findAllArtworksByType '+this.findAllByTypeRequest);
    await (await this.databaseService.getDatabase()).executeSql(this.findAllByTypeRequest, [type]).then(res => {
      artworks = this.extractResultSet(res);
    });

    return artworks;
  }

  public async findArtworkByTitle(artwork: Artwork) {
    console.log('findArtwork ?', artwork.title);
   return  (await this.databaseService.getDatabase()).executeSql(this.findByTitleRequest, [artwork.title]).then(res =>
       res.rows.item(0) //TODO is Null?
    );
  }

  public async findAll(){
    console.log("ArtworkDaoService.findAll : "+this.findAllRequest)
    let artworks: Artwork[] = [];
    await (await this.databaseService.getDatabase()).executeSql(this.findAllRequest, []).then(res => {
      artworks = this.extractResultSet(res);
    });

    return artworks;
  }

  private extractResultSet(res: { rows: { length: number; item: (arg0: number) => Artwork; }; }){
    const artworks: Artwork[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      artworks.push(res.rows.item(i));
    }

    return artworks;
  }


}
