import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Artwork } from 'src/entities/artwork';
import { Group } from 'src/entities/group';
import { Lecture } from 'src/entities/lecture';
import { Question } from 'src/entities/Question';

import {
  createConnection,
  ConnectionOptions,
  getConnection,
  Connection
} from 'typeorm';

@Injectable({
  providedIn: 'root'
})
export class OrmService {

  constructor(private platform: Platform) { }

  /**
 * Créé une connection à la base de données
 */
  private async createConnection(): Promise<Connection> {
    let dbOptions: ConnectionOptions;

      // dbOptions = {
      //   type: 'sqlite',
      //   name: "default",
      //   entities: ['src/entities/*.ts'],
      //   logging: ['error', 'query', 'schema'],
      //   database: '__mydatabase',
      // };
     
      if (this.platform.is('cordova')) {

        dbOptions = {
          type: 'cordova',
          database: '__mydatabase',
          location: 'default'
        };
      } else {
  
        dbOptions = {
          type: 'sqljs',
          location: 'browser',
          autoSave: true
        };
      }

      Object.assign(dbOptions, {
        name:"default",
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [Lecture, Artwork, Question, Group]
        
      });
      return await createConnection(dbOptions);
    
  }

  /**
  * Lance la connection à la base de données
  */
  async ready() {
    try {
      await getConnection();
    } catch (ex) {
      console.log('Connection not established!', ex);

      await this.createConnection();
    }
  }

}
