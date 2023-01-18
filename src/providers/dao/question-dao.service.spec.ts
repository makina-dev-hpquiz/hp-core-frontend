import { TestBed } from '@angular/core/testing';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { of } from 'rxjs';
import { Lecture } from 'src/entities/lecture';
import { Question } from 'src/entities/Question';
import { Difficulty } from 'src/models/enums/difficultyEnum';
import { TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { DatabaseService } from '../database.service';
import { ArtworkDaoService } from './artwork-dao.service';

import { QuestionDaoService } from './question-dao.service';

describe('QuestionDaoService', () => {
  let service: QuestionDaoService;

  let mockDatabaseService: jasmine.SpyObj<DatabaseService>;
  let mockSQLiteObject: jasmine.SpyObj<SQLiteObject>;

  // private Properties
  const storage = 'storage';
  const database = 'database ';
  const table = 'table';
  const addRequest = 'addRequest';
  const findNewestQuestionRequest = 'findNewestQuestionRequest';
  const updateRequest = 'updateRequest';

  // Private method
  const findNewestQuestion = 'findNewestQuestion';

  const question = new Question();
  question.question = 'Question';
  question.answer = 'Réponse';
  question.type = TypeQuestion.question;
  question.difficulty = Difficulty.moyen;

  const lecture = new Lecture();
  lecture.id = 1;
  question.lecture = lecture;

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
    service = TestBed.inject(QuestionDaoService);

    service[database] = mockSQLiteObject;
    mockDatabaseService.getDatabase.and.returnValue(of(mockSQLiteObject).toPromise());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TNR requêtes', () => {
    const addRequestExpected = 'INSERT INTO ' + service[table] +
      ' (question, answer, type, difficulty, nbPlayer, particularity, isCreated, isUpdated, lecture_id) '
      + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const findNewestQuestionRequestExpected = 'SELECT * FROM ' + service[table] + ' ORDER BY id DESC LIMIT 1;';
    const updateRequestExpected = 'UPDATE ' + service[table] +
      ' SET question = ?, answer = ?, type = ?, difficulty = ?, nbPlayer = ?, particularity = ?, isUpdated = ? ' +
      'WHERE id = ?;';

    expect(addRequestExpected).toEqual(service[addRequest]);
    expect(findNewestQuestionRequestExpected).toEqual(service[findNewestQuestionRequest]);
    expect(updateRequestExpected).toEqual(service[updateRequest]);
  });

  it('saveQuestion', async () => {

    const findNewestQuestionSpy = spyOn<any>(service, 'findNewestQuestion');
    await findNewestQuestionSpy.and.returnValue(of(question).toPromise());

    const questionSaved = await service.saveQuestion(question);
    expect(questionSaved).toEqual(question);
  });

  it('findNewestQuestion', async () => {
    const questions = new Array(
      question
    );

    const resSpecific = {
      rows: {
        length: questions.length,
        values: questions,
        item(index: number) { return this.values[index]; }
      }
    };

    await mockSQLiteObject.executeSql.and.returnValue(of(resSpecific).toPromise());

    const film = await service[findNewestQuestion]();
    expect(questions[0]).toEqual(question);
  });

  it('updateQuestion', async () => {
    const isUpdated = question.isUpdated;
    await service.updateQuestion(question);
    expect(isUpdated).not.toEqual(question.isUpdated);
  });
});
