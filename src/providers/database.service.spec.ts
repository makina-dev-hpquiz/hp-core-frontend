import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
    let service: DatabaseService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let sqliteClientSpy: jasmine.SpyObj<typeof SQLite>;
    let sqlitePorterClientSpy: jasmine.SpyObj<SQLitePorter>;


    beforeEach(() => {
      
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    sqliteClientSpy = jasmine.createSpyObj('SQLite', ['create']);
    sqlitePorterClientSpy = jasmine.createSpyObj('SQLitePorter', ['importSqlToDb']);

      service = new DatabaseService(httpClientSpy, sqlitePorterClientSpy);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
});
