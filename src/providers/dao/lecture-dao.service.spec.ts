import { TestBed } from '@angular/core/testing';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { of } from 'rxjs';
import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { ArtworkType } from 'src/models/enums/typeArtworkEnum';
import { DatabaseService } from '../database.service';

import { LectureDaoService } from './lecture-dao.service';

describe('LectureDaoService', () => {
  let service: LectureDaoService;

  const table = 'table';

  const lectures = new Array(
    new Lecture(),
    new Lecture()
  );
  const res = {
    rows: {
        length: lectures.length,
        values: lectures,
        item(index: number){return this.values[index];}
      }
  };

  // private Properties
  const database = 'database';
  const storage = 'storage';
  const addRequest = 'addRequest';
  const findAllByArtworkRequest = 'findAllByArtworkRequest';
  const findByDateRequest = 'findByDateRequest';

  // private Method
  const findByDate = 'findByDate';
  let mockDatabaseService: jasmine.SpyObj<DatabaseService>;
  let mockSQLiteObject: jasmine.SpyObj<SQLiteObject>;

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

    service = TestBed.inject(LectureDaoService);
    service[database] = mockSQLiteObject;
    mockDatabaseService.getDatabase.and.returnValue(of(mockSQLiteObject).toPromise());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TNR requêtes', () => {
    const addRequestExpected = 'INSERT INTO ' + service[table] + ' (date, start, end, is_progress, artwork_id) VALUES (?, ?, ?, ?, ?);';
    const findAllByArtworkRequestExpected = 'SELECT * FROM '+service[table]+' WHERE artwork_id = ?;';
    const findByDateRequestExpected = 'SELECT * FROM '+service[table]+' WHERE date = ?;';

    expect(addRequestExpected).toEqual(service[addRequest]);
    expect(findAllByArtworkRequestExpected).toEqual(service[findAllByArtworkRequest]);
    expect(findByDateRequestExpected).toEqual(service[findByDateRequest]);
  });


  it('Sauvegarder une lecture', async () => {
    const film = new Artwork('Les Animaux fantastiques', 'Film');
    const lecture = new Lecture();
    lecture.artwork = film;

    await service.saveLecture(lecture);
    expect(mockSQLiteObject.executeSql).toHaveBeenCalled();
  });

  it('Récupérer toutes les lectures associées à l\'oeuvre les Animaux fantastiques', async () => {

    res.rows.values = lectures;
    res.rows.length = lectures.length;

    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());
    const film = new Artwork('Les Animaux fantastiques', ArtworkType.movie);
    const lecturesResult = await service.findAllByArtwork(film);

    expect(lectures).toEqual(lecturesResult);
  });

  it('Récupérer une lecture via sa date', async () => {

    const film = new Artwork('Les Animaux fantastiques', ArtworkType.movie);
    const lecture = new Lecture();
    lecture.artwork = film;

    res.rows.values = [lecture];
    res.rows.length = 1;

    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());
    const lectureResult = await service[findByDate](lecture);

    expect(lecture).toEqual(lectureResult);
  });
});
