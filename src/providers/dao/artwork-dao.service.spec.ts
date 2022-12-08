import { TestBed } from '@angular/core/testing';

import { ArtworkDaoService } from './artwork-dao.service';
import { DatabaseService } from '../database.service';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { Artwork } from 'src/entities/artwork';
import { of } from 'rxjs';

describe('ArtworkDaoService', () => {
  let service: ArtworkDaoService;

  let mockDatabaseService: jasmine.SpyObj<DatabaseService>;
  let mockSQLiteObject: jasmine.SpyObj<SQLiteObject>;


  const table = 'table';

  // private Properties
  const storage = 'storage';
  const database = 'database';
  const addRequest = 'addRequest';
  const findAllByTypeRequest = 'findAllByTypeRequest';
  const findByTitleRequest = 'findByTitleRequest';
  const findAllRequest = 'findAllRequest';
  const updateRequest = 'updateRequest';


  // private Method
  const extractResultSet = 'extractResultSet';


  const artworks = new Array(
    new Artwork('HP1', 'Film'),
    new Artwork('HP2', 'Film')
  );
  const res = {
    rows: {
        length: artworks.length,
        values: artworks,
        item(index: number){return this.values[index];}
      }
  };


  beforeEach(() => {
    mockSQLiteObject =
      jasmine.createSpyObj<SQLiteObject>('SQLiteObject', ['executeSql']);
    mockDatabaseService =
      jasmine.createSpyObj<DatabaseService>('DatabaseService', ['getDatabase']);
    mockDatabaseService[storage] = mockSQLiteObject;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        }
      ]
    });
    service = TestBed.inject(ArtworkDaoService);
    service[database] = mockSQLiteObject;
    mockDatabaseService.getDatabase.and.returnValue(of(mockSQLiteObject).toPromise());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('TNR requêtes', () => {
    const addRequestExpected = 'INSERT INTO ' + service[table] + ' (title, type) VALUES (?, ?);';
    const findAllByTypeRequestExpected = 'SELECT * FROM ' + service[table] + ' WHERE type = ? ORDER BY id DESC;';
    const findByTitleRequestExpected = 'SELECT * FROM ' + service[table] + ' WHERE title = ?;';
    const findAllRequestExpected = 'SELECT * FROM '+service[table]+';';
    const updateRequestExpected = 'UPDATE '+service[table]+' SET title = ?, type = ? WHERE id = ?;';

    expect(addRequestExpected).toEqual(service[addRequest]);
    expect(findAllByTypeRequestExpected).toEqual(service[findAllByTypeRequest]);
    expect(findByTitleRequestExpected).toEqual(service[findByTitleRequest]);
    expect(findAllRequestExpected).toEqual(service[findAllRequest]);
    expect(updateRequestExpected).toEqual(service[updateRequest]);

  });


  it('Trouvé les artworks de type film', async () => {
    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());

    const films = await service.findAllArtworksByType('film');
    expect(artworks).toEqual(films);
  });


  it('Trouvé l\'artwork avec le titre Les Animaux fantastiques', async () => {
    const artworks2 = new Array(
      new Artwork('Les Animaux fantastiques', 'Film')
    );

    const resSpecific = {
      rows: {
          length: artworks2.length,
          values: artworks2,
          item(index: number){return this.values[index];}
        }
    };

    await mockSQLiteObject.executeSql.and.returnValue(of(resSpecific).toPromise());

    const film = await service.findArtworkByTitle(artworks2[0]);
    expect(artworks2[0]).toEqual(film);
  });

  it('Sauvegarder un artwork', async () => {
    const film = new Artwork('Les Animaux fantastiques', 'Film');
    const findArtworkSpy = spyOn(service, 'findArtworkByTitle');
    await findArtworkSpy.and.returnValue(of(film).toPromise());

    const filmSaved = await service.saveArtwork(film);
    expect(filmSaved).toEqual(film);
  });

  it('FindAll', async () => {
    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());

    const films = await service.findAll();
    expect(artworks).toEqual(films);
  });

  it('Mettre à jour un artwork', async () => {
    const film = new Artwork('Les Animaux fantastiques', 'Film');
    await service.updateArtwork(film);
    expect(mockSQLiteObject.executeSql).toHaveBeenCalled();
  });


  it('private extractResultSet', async () => {
    const artworksResult = service[extractResultSet](res);
    expect(artworks).toEqual(artworksResult);
  });


});
