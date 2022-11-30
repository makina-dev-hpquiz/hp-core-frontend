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

const artwork1: Artwork = {
  id: 1,
  title : 'Le Hobbit',
  type: selectedArtworkType
};
const artwork2: Artwork = {
  id: 2,
  title : 'Harry Potter 1',
  type: selectedArtworkType
};


describe('ConfigureLecturePage', () => {
  let component: ConfigureLecturePage;
  let fixture: ComponentFixture<ConfigureLecturePage>;

  let mockConfigureLectureService: jasmine.SpyObj<ConfigureLectureService>;


  beforeEach(waitForAsync(async () => {
    mockConfigureLectureService =
    jasmine.createSpyObj<ConfigureLectureService>('ConfigureLectureService', [
      'initializeNewLecture', 'addArtwork', 'findArtworksByType', 'saveLecture', 'updateArtwork'
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

  it('Ajouter une oeuvre', async () => {
    spyOn(window, 'prompt').and.returnValue('Batman');
    const artwork3: Artwork = {
      id: 3,
      title : 'Batman',
      type: selectedArtworkType
    };

    await mockConfigureLectureService.addArtwork.and.returnValue(of(artwork3).toPromise());
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork1, artwork2, artwork3]).toPromise());
 
    await component.newArtwork();
;
    expect(component.selectedArtwork.title).toEqual(artwork3.title);
    expect(component.artworksList.length).toEqual(3);

  })

  it('Mettre à jour une oeuvre', async () => {
    component.selectedArtwork = artwork2;
    spyOn(window, 'prompt').and.returnValue('Harry Potter 2')
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork1, artwork2]).toPromise());

    await component.updateArtwork();
    expect(component.artworksList.length).toEqual(2);


  }) 
});
