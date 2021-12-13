import { Injectable } from '@angular/core';
import { Artwork } from 'src/entities/artwork';
import { getRepository } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

@Injectable({
  providedIn: 'root'
})
export class ArtworkDaoService {

  
  private artworkRepository : Repository<Artwork>;

  constructor() {
    this.artworkRepository = getRepository(Artwork);
   }

  /**
     * Sauvegarde une entité lecture de la base de données
     */
   public async saveArtwork(artwork: Artwork) {
    try {
      return await this.artworkRepository.save(artwork);
    } catch (error) {
      console.log('ArtworkDaoService - saveArtwork : La sauvegarde a echoué' + error);
    }
  }

  /**
   * Retourne une liste d'artwork possédant le type fourni en paramètre
   * @param type String
   * @returns Artwork[]
   */
  public async findAllArtworksByType(type:String): Promise<Artwork[]> {
    return await this.artworkRepository.find({ where: { type: type } })
  }


}
