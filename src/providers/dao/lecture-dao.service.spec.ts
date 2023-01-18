import { TestBed } from '@angular/core/testing';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { of } from 'rxjs';
import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { ArtworkType } from 'src/models/enums/typeArtworkEnum';
import { DatabaseService } from '../database.service';
import { ArtworkDaoService } from './artwork-dao.service';

import { LectureDaoService } from './lecture-dao.service';

describe('LectureDaoService', () => {
  let service: LectureDaoService;

  const table = 'table';


  const lectures = new Array(
    new Lecture(),
    new Lecture()
  );



  lectures[0].id = 1;
  lectures[1].id = 2;


  const res = {
    rows: {
      length: lectures.length,
      values: lectures,
      item(index: number) { return this.values[index]; }
    }
  };

  // private Properties
  const database = 'database';
  const storage = 'storage';
  const addRequest = 'addRequest';
  const findAllByArtworkRequest = 'findAllByArtworkRequest';
  const findByDateRequest = 'findByDateRequest';
  const findAllRequest = 'findAllRequest';

  // private Method
  const findByDate = 'findByDate';
  const getArtwork = 'getArtwork';

  let mockDatabaseService: jasmine.SpyObj<DatabaseService>;
  let mockSQLiteObject: jasmine.SpyObj<SQLiteObject>;
  let mockArtworkDaoService: jasmine.SpyObj<ArtworkDaoService>;

  beforeEach(() => {
    mockSQLiteObject =
      jasmine.createSpyObj<SQLiteObject>('SQLiteObject', ['executeSql']);
    mockDatabaseService =
      jasmine.createSpyObj<DatabaseService>('DatabaseService', ['getDatabase']);
    mockDatabaseService[storage] = mockSQLiteObject;
    mockArtworkDaoService = jasmine.createSpyObj<ArtworkDaoService>('ArtworkDaoService', ['findById']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        },
        {
          provide: ArtworkDaoService,
          useValue: mockArtworkDaoService
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
    const findAllByArtworkRequestExpected = 'SELECT * FROM ' + service[table] + ' WHERE artwork_id = ?;';
    const findByDateRequestExpected = 'SELECT * FROM ' + service[table] + ' WHERE date = ?;';
    const findAllRequestExpected = 'SELECT * FROM ' + service[table] + ';';

    expect(addRequestExpected).toEqual(service[addRequest]);
    expect(findAllByArtworkRequestExpected).toEqual(service[findAllByArtworkRequest]);
    expect(findByDateRequestExpected).toEqual(service[findByDateRequest]);
    expect(findAllRequestExpected).toEqual(service[findAllRequest]);
  });


  it('Sauvegarder une lecture', async () => {
    const film = new Artwork('Les Animaux fantastiques', 'Film');
    const lecture = new Lecture();
    lecture.artwork = film;

    await service.saveLecture(lecture);
    expect(mockSQLiteObject.executeSql).toHaveBeenCalled();
  });

  it('Récupérer toutes les lectures associées à l\'oeuvre les Animaux fantastiques', async () => {
    const film = new Artwork('Les Animaux fantastiques', ArtworkType.movie);
    film.id = 1;

    lectures[0].id = 1;
    lectures[1].id = 2;
    lectures[0].artwork = film;
    lectures[1].artwork = film;
    res.rows.values = lectures;
    res.rows.length = lectures.length;

    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());
    const getArtworkSpy = spyOn<any>(service, getArtwork);
    getArtworkSpy.and.returnValue(film);

    const lecturesResult = await service.findAllByArtwork(film);

    expect(lectures.length).toEqual(lecturesResult.length);
    expect(lectures[0].id).toEqual(lecturesResult[0].id);
    expect(lectures[1].id).toEqual(lecturesResult[1].id);
    expect(lectures[0].artwork.id).toEqual(lecturesResult[0].artwork.id);
    expect(lectures[1].artwork.id).toEqual(lecturesResult[1].artwork.id);
    expect(lectures[0].artwork.title).toEqual(lecturesResult[0].artwork.title);
    expect(lectures[1].artwork.title).toEqual(lecturesResult[1].artwork.title);
  });

  it('Récupérer toutes les lectures', async () => {
    const film = new Artwork('Les Animaux fantastiques', ArtworkType.movie);
    film.id = 1;

    res.rows.values = lectures;
    res.rows.length = lectures.length;

    const getArtworkSpy = spyOn<any>(service, getArtwork);
    getArtworkSpy.and.returnValue(film);
    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());

    const lecturesResult = await service.findAll();

    expect(lecturesResult.length).toEqual(2);
  });

  it('Private - Récupérer une lecture via sa date', async () => {
    const film = new Artwork('Les Animaux fantastiques', ArtworkType.movie);
    film.id = 1;

    const lecture = new Lecture();
    lecture.id = 1;
    lecture.artwork = film;

    res.rows.values = [lecture];
    res.rows.length = 1;

    const getArtworkSpy = spyOn<any>(service, getArtwork);
    getArtworkSpy.and.returnValue(film);
    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());

    const lectureResult = await service[findByDate](lecture);

    expect(lecture.id).toEqual(lectureResult.id);
    expect(lecture.date).toEqual(lectureResult.date);
    expect(lecture.artwork.title).toEqual(lectureResult.artwork.title);
    expect(lecture.artwork.type).toEqual(lectureResult.artwork.type);
    expect(lecture.artwork.id).toEqual(lectureResult.artwork.id);
  });

  it('Private - Récupérer l\'artwork associé à la lecture', async () => {
    const film = new Artwork('Les Animaux fantastiques', ArtworkType.movie);
    film.id = 1;
    const lecture = new Lecture();
    lecture.id = 1;
    lecture.artwork = film;

    mockArtworkDaoService.findById.and.returnValue(of(film).toPromise());
    const filmResult = await service[getArtwork](lecture);

    expect(film.id).toEqual(filmResult.id);
  });
});
