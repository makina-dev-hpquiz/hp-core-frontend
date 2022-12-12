import { TestBed } from '@angular/core/testing';
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
});
