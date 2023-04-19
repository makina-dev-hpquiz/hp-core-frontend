import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Lecture } from 'src/entities/lecture';
import { Question } from 'src/entities/question';
import { Difficulty } from 'src/models/enums/difficultyEnum';
import { TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { ConfigureLectureService } from './configure-lecture.service';
import { GroupDaoService } from './dao/group-dao.service';
import { QuestionDaoService } from './dao/question-dao.service';

import { LectureService } from './lecture.service';

describe('LectureService', () => {
  let service: LectureService;

  let mockConfigureLectureService: jasmine.SpyObj<ConfigureLectureService>;
  let mockQuestionDaoService: jasmine.SpyObj<QuestionDaoService>;
  let mockGroupDaoService: jasmine.SpyObj<GroupDaoService>;


  //Proprété privée
  const configureLectureService = 'configureLectureService';
  const lectureProp = 'lecture';
  const isInitialize = 'isInitialize';

  beforeEach(() => {
    mockQuestionDaoService = jasmine.createSpyObj<QuestionDaoService>('QuestionDaoService', ['saveQuestion', 'updateQuestion']);
    mockConfigureLectureService = jasmine.createSpyObj<ConfigureLectureService>('ConfigureLectureService',
    ['getCurrentLecture', 'loadLecture']);
    TestBed.configureTestingModule({
      providers:[
        {
          provide: ConfigureLectureService,
          useValue: mockConfigureLectureService
        },
        {
          provide: QuestionDaoService,
          useValue: mockQuestionDaoService
        },
        {
          provide: GroupDaoService,
          useValue: mockGroupDaoService
        }
      ]

    });
    service = TestBed.inject(LectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initialize', async () => {
    const lecture = new Lecture();
    lecture.id = 1;
    mockConfigureLectureService.getCurrentLecture.and.returnValues(await of(lecture).toPromise());
    service.initialize();

    expect(service.lecture).toEqual(lecture);
    expect(service.questions.length).toEqual(0);
    expect(service.groups.length).toEqual(0);
    expect(service[isInitialize]).toBeTrue();
  });

  it('loadLecture', async () => {
    const lecture = new Lecture();
    lecture.id = 1;
    lecture.questions = new Array(new Question(), new Question());
    mockConfigureLectureService.getCurrentLecture.and.returnValues(await of(lecture).toPromise());
    service.loadLecture(lecture);

    expect(service.lecture).toEqual(lecture);
    expect(service.questions.length).toEqual(2);

  });

  it('addQuestion', async () => {
    const q1 = new Question();
    q1.question = 'Question';
    q1.answer = 'Réponse';
    q1.difficulty = Difficulty.moyen;
    q1.type = TypeQuestion.question;
    const lecture = new Lecture();
    lecture.id = 1;
    q1.lecture = lecture;

    await mockQuestionDaoService.saveQuestion.and.returnValue(of(q1).toPromise());
    service.lecture = lecture;

    await service.addQuestion(q1);
    expect(mockQuestionDaoService.saveQuestion).toHaveBeenCalled();
    expect(service.questions.length).toEqual(1);
  });

  it('updateQuestion', async () => {
    const q1 = new Question();
    q1.question = 'Question';
    q1.answer = 'Réponse';
    q1.difficulty = Difficulty.moyen;
    q1.type = TypeQuestion.question;
    q1.lecture = new Lecture();
    q1.lecture.id = 1;

    service.questions.push(q1);
    const q1Updated = Object.assign({}, q1);
    q1Updated.question = 'Question Updated';

    await service.updateQuestion(q1Updated);

    expect(mockQuestionDaoService.updateQuestion).toHaveBeenCalled();
    expect(service.questions.length).toEqual(1);
    expect(service.questions[0].question).toEqual(q1Updated.question);
  });
});
