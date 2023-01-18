import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ArtworkDaoService } from 'src/providers/dao/artwork-dao.service';
import { LectureDaoService } from 'src/providers/dao/lecture-dao.service';

import { LecturesPage } from './lectures.page';

describe('LecturesPage', () => {
  let component: LecturesPage;
  let fixture: ComponentFixture<LecturesPage>;

  let mockLectureDaoService: jasmine.SpyObj<LectureDaoService>;
  let mockArtworkDaoService: jasmine.SpyObj<ArtworkDaoService>;

  beforeEach(waitForAsync(() => {
    mockLectureDaoService = jasmine.createSpyObj<LectureDaoService>('LectureDaoService',
      ['findAll', 'findAllByArtwork']);
    mockArtworkDaoService = jasmine.createSpyObj<ArtworkDaoService>('ArtworkDaoService', ['findAll']);

    TestBed.configureTestingModule({
      declarations: [LecturesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: LectureDaoService,
          useValue: mockLectureDaoService
        },
        {
          provide: ArtworkDaoService,
          useValue: mockArtworkDaoService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
