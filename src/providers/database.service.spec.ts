import { TestBed } from '@angular/core/testing';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { DatabaseService } from './database.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatabaseService', () => {
    let service: DatabaseService;
    beforeEach(() => {
      
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [SQLitePorter]
    });
    service = TestBed.inject(DatabaseService);

    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
});
