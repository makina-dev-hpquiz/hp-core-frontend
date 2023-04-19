import { TestBed } from '@angular/core/testing';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { of } from 'rxjs';
import { Lecture } from 'src/entities/lecture';
import { Question } from 'src/entities/question';
import { Difficulty } from 'src/models/enums/difficultyEnum';
import { TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { DatabaseService } from '../database.service';


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
  const findAllByLectureRequest = 'findAllByLectureRequest';

  // Private method
  const findNewestQuestion = 'findNewestQuestion';
  const lectureId = 'lecture_id';

  const question = new Question();
  question.id = '1';
  question.question = 'Question';
  question.answer = 'Réponse';
  question.type = TypeQuestion.question;
  question.difficulty = Difficulty.moyen;
  question.nbPlayer = 2;
  question.particularity = '2';

  const question2 = {
  id : '2',
  question : 'Question 2',
  answer : 'Réponse 2',
  type : TypeQuestion.question,
  difficulty : Difficulty.moyen,
  nbPlayer : 2,
  particularity : '2'
  };
  question2[lectureId] = 1;

  const question3 = {
    id : '3',
    question : 'Question 3',
    answer : 'Réponse 3',
    type : TypeQuestion.question,
    difficulty : Difficulty.moyen,
    nbPlayer : 2,
    particularity : '2'
    };
    question3[lectureId] = 1;


  const lecture = new Lecture();
  lecture.id = 1;
  question.lecture = lecture;

  const questions = new Array(
    question2,
    question3
  );

    const res = {
      rows: {
          length: questions.length,
          values: questions,
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
    service = TestBed.inject(QuestionDaoService);
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
    const findAllByLectureRequestExpected = 'SELECT * FROM '+ service[table]+ ' WHERE lecture_id = ? ORDER BY isUpdated DESC;';

    expect(addRequestExpected).toEqual(service[addRequest]);
    expect(findNewestQuestionRequestExpected).toEqual(service[findNewestQuestionRequest]);
    expect(updateRequestExpected).toEqual(service[updateRequest]);
    expect(findAllByLectureRequestExpected).toEqual(service[findAllByLectureRequest]);

  });

  it('saveQuestion', async () => {

    const findNewestQuestionSpy = spyOn<any>(service, 'findNewestQuestion');
    await findNewestQuestionSpy.and.returnValue(of(question).toPromise());

    const questionSaved = await service.saveQuestion(question);
    expect(questionSaved).toEqual(question);
  });

  it('findNewestQuestion', async () => {
    const questionsSpecific = new Array(
      question
    );

    const resSpecific = {
      rows: {
        length: questionsSpecific.length,
        values: questionsSpecific,
        item(index: number) { return this.values[index]; }
      }
    };

    await mockSQLiteObject.executeSql.and.returnValue(of(resSpecific).toPromise());

    const questionResult = await service[findNewestQuestion]();
    expect(questionsSpecific[0]).toEqual(question);
    expect(questionResult.id).toEqual(question.id);
  });

  it('updateQuestion', async () => {
    const isUpdated = question.isUpdated;
    await service.updateQuestion(question);
    expect(isUpdated).not.toEqual(question.isUpdated);
  });

  it('FindAllByLecture', async () => {
    await mockSQLiteObject.executeSql.and.returnValue(of(res).toPromise());
    const questionsResult = await service.findAllByLecture(lecture);

    expect(2).toEqual(questionsResult.length);
    expect(question2.id).toEqual(questionsResult[0].id);
    expect(question3.id).toEqual(questionsResult[1].id);
    expect(lecture.id).toEqual(questionsResult[0].lecture.id);
    expect(lecture.id).toEqual(questionsResult[1].lecture.id);
  });
});
