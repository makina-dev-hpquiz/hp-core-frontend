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

  const artworks = new Array(
    new Artwork('HP1', 'Film'),
    new Artwork('HP2', 'Film')
  )
  const res = {
    rows: {
        length: artworks.length,
        values: artworks,
        item(number){return this.values[number]}
      }
  }


  beforeEach(() => {
    mockSQLiteObject =
      jasmine.createSpyObj<SQLiteObject>('SQLiteObject', ['executeSql']);
    mockDatabaseService =
      jasmine.createSpyObj<DatabaseService>('DatabaseService', ['getDatabase']);
    mockDatabaseService['storage'] = mockSQLiteObject;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        }
      ]
    });
    service = TestBed.inject(ArtworkDaoService);
    service['database'] = mockSQLiteObject;
    
    mockDatabaseService.getDatabase.and.returnValue(of(mockSQLiteObject).toPromise());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('TNR requêtes', () => {
    let addRequestExpected = 'INSERT INTO ' + service[table] + ' (title, type) VALUES (?, ?);';
    let findAllByTypeRequestExpected = 'SELECT * FROM ' + service[table] + ' WHERE type = ? ORDER BY id DESC;';
    let findByTitleRequestExpected = 'SELECT * FROM ' + service[table] + ' WHERE title = ?;'
    let findAllRequestExpected = 'SELECT * FROM '+service[table]+';';

    expect(addRequestExpected).toEqual(service['addRequest']);
    expect(findAllByTypeRequestExpected).toEqual(service['findAllByTypeRequest']);
    expect(findByTitleRequestExpected).toEqual(service['findByTitleRequest']);
    expect(findAllRequestExpected).toEqual(service['findAllRequest']);

  });


  it('Trouvé les artworks de type film', async () => {
    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());

    let films = await service.findAllArtworksByType('film');
    expect(artworks).toEqual(films);
  });

  
  it('Trouvé l\'artwork avec le titre Les Animaux fantastiques', async () => {
    const artworks = new Array(
      new Artwork('Les Animaux fantastiques', 'Film')
    )
   
    const res = {
      rows: {
          length: artworks.length,
          values: artworks,
          item(number){return this.values[number]}
        }
    }
    
    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());

    let film = await service.findArtworkByTitle(artworks[0]);
    expect(artworks[0]).toEqual(film);
  });

  it('Sauvegarder un artwork', async () => {
    let film = new Artwork('Les Animaux fantastiques', 'Film');
    let findArtworkSpy = spyOn(service, 'findArtworkByTitle');
    await findArtworkSpy.and.returnValue(of(film).toPromise());

    let filmSaved = await service.saveArtwork(film);
    expect(filmSaved).toEqual(film);
  });

  it('FindAll', async() => {
    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());

    let films = await service.findAll();
    expect(artworks).toEqual(films);
  });



  it('private extractResultSet', async() => {
    let artworksResult = service['extractResultSet'](res);
    
    expect(artworks).toEqual(artworksResult);
  }); 


});
