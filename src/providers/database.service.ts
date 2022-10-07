import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private storage: SQLiteObject;

    constructor(private httpClient: HttpClient,
        private sqlPorter: SQLitePorter,
        private platform: Platform) { }

    private async initialize() {

        await this.platform.ready().then(async () => {
            console.log('Intialize sqlite storage');
           
            await SQLite.create({
                name: 'data.db',
                location: 'default'
            }).then(async (db: SQLiteObject) => {
                    this.storage = db;
                    await this.httpClient.get(
                        'assets/database/tables.sql',
                        { responseType: 'text' }
                    ).subscribe(async data => {
                        await this.sqlPorter.importSqlToDb(this.storage, data)
                            .catch(error => console.error(error));
                    });

                    console.log('Tables created');
                })
                .catch(e => console.log(e));
            });
    }

    /**
     * Retourne un objet storage déjà initialisé
     *
     * @returns SQLiteObject
     */
    public async getDatabase(): Promise<SQLiteObject> {
        if (!this.storage) {
            await this.initialize();
        }
        return this.storage;
    }


    /**
     * Utiliser pour vider la bdd lors du développement de l'application
     */
    private async resetDatabase(){
        await SQLite.deleteDatabase({
            name: 'data.db',
            location: 'default'
        });
    }
}
