import { TestBed } from '@angular/core/testing';

import { QuestionDaoService } from './question-dao.service';

describe('QuestionDaoService', () => {
  let service: QuestionDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
