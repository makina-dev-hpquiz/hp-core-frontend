import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { ArtworkType } from 'src/models/enums/typeArtworkEnum';
import { ConfigureLectureService } from 'src/providers/configure-lecture.service';

import { ConfigureLecturePage } from './configure-lecture.page';

const selectedArtworkType = ArtworkType.BOOK;
const artwork1 = new Artwork('Le Hobbit', selectedArtworkType);
const artwork2 = new Artwork('Harry Potter 1', selectedArtworkType);

describe('ConfigureLecturePage', () => {
  let component: ConfigureLecturePage;
  let fixture: ComponentFixture<ConfigureLecturePage>;

  let mockConfigureLectureService: jasmine.SpyObj<ConfigureLectureService>;


  beforeEach(waitForAsync(async () => {
    mockConfigureLectureService =
    jasmine.createSpyObj<ConfigureLectureService>('ConfigureLectureService', [
      'initializeNewLecture', 'addArtwork', 'findArtworksByType', 'saveLecture'
    ]);

    TestBed.configureTestingModule({
      declarations: [ ConfigureLecturePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: ConfigureLectureService,
          useValue: mockConfigureLectureService
        }
      ]
    }).compileComponents();

    mockConfigureLectureService.initializeNewLecture.and.returnValue(await of(new Lecture()).toPromise());

    fixture = TestBed.createComponent(ConfigureLecturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async () => {
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork1, artwork2]).toPromise());
    expect(component).toBeTruthy();
  });
});
