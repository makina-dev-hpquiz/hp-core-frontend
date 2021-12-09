import { TestBed } from '@angular/core/testing';

import { ConfigureLectureService } from './configure-lecture.service';

describe('ConfigureLectureService', () => {
  let service: ConfigureLectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigureLectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
