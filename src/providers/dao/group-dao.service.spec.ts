import { TestBed } from '@angular/core/testing';

import { GroupDaoService } from './group-dao.service';

describe('GroupDaoService', () => {
  let service: GroupDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
