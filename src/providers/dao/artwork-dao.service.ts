import { Injectable, OnInit } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Artwork } from 'src/entities/artwork';
import { DatabaseService } from '../database.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkDaoService {

  private table = 'artwork';
  constructor(private databaseService: DatabaseService) { }

  private database: SQLiteObject;

  /**
     * Sauvegarde une entité lecture de la base de données
     */
  public async saveArtwork(artwork: Artwork) {
    let artworkSaved: Artwork;
    console.log("ArtworkDaoService.saveArtwork : ", artwork.title, artwork.type);
    try {
      (await this.databaseService.getDatabase()).executeSql('INSERT INTO ' + this.table + ' (title, type) VALUES (?, ?);', [artwork.title, artwork.type]);
    } catch (error) {
      console.log("Erreur saveArtwork ", error)
    }
    return await this.findArtwork(artwork);
  }

  /**
   * Retourne une liste d'artwork possédant le type fourni en paramètre
   * @param type String
   * @returns Artwork[]
   */
  public async findAllArtworksByType(type: string): Promise<Artwork[]> {
    let artworks: Artwork[] = [];
    this.database = await this.databaseService.getDatabase();

    console.log("ArtworkDaoService.findAllArtworksByType");
    (await this.database.executeSql('SELECT * FROM ' + this.table+ ' WHERE type = ? ORDER BY id DESC', [type]).then(res => {
      for (var i = 0; i < res.rows.length; i++) { 
        artworks.push(res.rows.item(i));
      }
    }));

    return artworks;  
  }

  public async findArtwork(artwork: Artwork) {
    let x;
    console.log("findArtwork ?", artwork.title);
   return  (await this.databaseService.getDatabase()).executeSql('SELECT * FROM ' + this.table + ' WHERE title = ?', [artwork.title]).then(res => {
      // console.log(res.rows.item(0));
      return res.rows.item(0); //TODO is Null?
    });

  }


}
