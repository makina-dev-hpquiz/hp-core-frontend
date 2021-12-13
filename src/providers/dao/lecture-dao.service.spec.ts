import { TestBed } from '@angular/core/testing';

import { LectureDaoService } from './lecture-dao.service';

describe('LectureDaoService', () => {
  let service: LectureDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LectureDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
