import { TestBed } from '@angular/core/testing';

import { ArtworkDaoService } from './artwork-dao.service';

describe('ArtworkDaoService', () => {
  let service: ArtworkDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtworkDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
