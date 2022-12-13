import { TestBed } from '@angular/core/testing';
import { componentOnReady } from '@ionic/core';
import { Question } from 'src/entities/Question';
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

  beforeEach(() => {
    mockQuestionDaoService = jasmine.createSpyObj<QuestionDaoService>('QuestionDaoService', ['saveQuestion']);
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

  it('addQuestion', () => {
    const q1 = new Question();
    q1.question = 'Question';
    q1.answer = 'Réponse';
    q1.difficulty = Difficulty.moyen;
    q1.type = TypeQuestion.question;

    service.addQuestion(q1);
    expect(mockQuestionDaoService.saveQuestion).toHaveBeenCalled();
  });
});
