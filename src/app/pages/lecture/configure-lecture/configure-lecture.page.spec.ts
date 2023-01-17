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

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

const selectedArtworkType = ArtworkType.book;

const artwork1: Artwork = {
  id: 1,
  title: 'Le Hobbit',
  type: selectedArtworkType
};
const artwork2: Artwork = {
  id: 2,
  title: 'Harry Potter 1',
  type: selectedArtworkType
};


describe('ConfigureLecturePage', () => {
  let component: ConfigureLecturePage;
  let fixture: ComponentFixture<ConfigureLecturePage>;

  let mockConfigureLectureService: jasmine.SpyObj<ConfigureLectureService>;
  let mockScreenOrientation: jasmine.SpyObj<ScreenOrientation>;

  // Nom de propriétés privées
  const router = 'router';
  const bookDisplayStartText = 'bookDisplayStartText';
  const serieDisplayStartText = 'serieDisplayStartText';
  const movieDisplayStartText = 'movieDisplayStartText';
  const replaceValue = 'replaceValue';
  const getArtworksByArtworkType = 'getArtworksByArtworkType';

  // Methodes privées
  const refreshArtworkList = 'refreshArtworkList';
  const selectFirstArtwork = 'selectFirstArtwork';

  beforeEach(waitForAsync(async () => {
    mockConfigureLectureService =
      jasmine.createSpyObj<ConfigureLectureService>('ConfigureLectureService', [
        'initializeNewLecture', 'addArtwork', 'findArtworksByType', 'saveLecture', 'updateArtwork'
      ]);
    mockScreenOrientation = jasmine.createSpyObj<ScreenOrientation>('ScreenOrientation', ['lock'],{
      ORIENTATIONS : {PORTRAIT: 'PORTRAIT',
      PORTRAIT_PRIMARY: 'PORTRAIT_PRIMARY',
      PORTRAIT_SECONDARY: 'PORTRAIT_SECONDARY',
      LANDSCAPE_PRIMARY: 'LANDSCAPE_PRIMARY',
      LANDSCAPE_SECONDARY: 'LANDSCAPE_SECONDARY',
      LANDSCAPE: 'LANDSCAPE',
      ANY: 'ANY'},
    });

    TestBed.configureTestingModule({
      declarations: [ConfigureLecturePage],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: ConfigureLectureService,
          useValue: mockConfigureLectureService
        },
        {
          provide: ScreenOrientation,
          useValue: mockScreenOrientation
        }
      ]
    }).compileComponents();

    mockConfigureLectureService.initializeNewLecture.and.returnValue(await of(new Lecture()).toPromise());

    fixture = TestBed.createComponent(ConfigureLecturePage);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await component.ionViewDidEnter();

  }));

  it('should create', async () => {
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork1, artwork2]).toPromise());
    expect(component).toBeTruthy();
  });

  it('Ajouter une oeuvre', async () => {
    spyOn(window, 'prompt').and.returnValue('Batman');
    const artwork3: Artwork = {
      id: 3,
      title: 'Batman',
      type: selectedArtworkType
    };

    await mockConfigureLectureService.addArtwork.and.returnValue(of(artwork3).toPromise());
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork3, artwork1, artwork2]).toPromise());

    await component.newArtwork();
    ;
    expect(component.selectedArtwork.title).toEqual(artwork3.title);
    expect(component.artworksList.length).toEqual(3);

  });

  it('Mettre à jour une oeuvre', async () => {
    component.selectedArtwork = artwork2;
    spyOn(window, 'prompt').and.returnValue('Harry Potter 2');
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork1, artwork2]).toPromise());

    await component.updateArtwork();
    expect(component.artworksList.length).toEqual(2);
  });

  it('selectedTypeChange', async () => {
    component.selectedArtworkType = ArtworkType.book;
    component.selectedArtwork = artwork1;
    expect(component.selectedArtwork.title).toEqual(artwork1.title);

    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork1, artwork2]).toPromise());
    await component.selectedTypeChange();

    expect(component.selectedArtwork.title).toEqual(artwork1.title);
    expect(component.artworksList.length).toEqual(2);


    component.selectedArtworkType = ArtworkType.movie;
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([]).toPromise());
    await component.selectedTypeChange();
    expect(component.selectedArtwork.title).toEqual(new Artwork().title);
    expect(component.artworksList.length).toEqual(0);

    const nameSerie = 'Game of Thrones';
    component.selectedArtworkType = ArtworkType.serie;
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of(
      [new Artwork(nameSerie, ArtworkType.serie)]).toPromise());
    await component.selectedTypeChange();
    expect(component.selectedArtwork.title).toEqual(nameSerie);
    expect(component.artworksList.length).toEqual(1);

  });

  it('displayTextStartLecture', () => {
    component.selectedArtworkType = ArtworkType.book;
    component.selectedArtwork = artwork1;
    let str = component.displayTextStartLecture();

    expect(component[bookDisplayStartText].replace(component[replaceValue], artwork1.title)).toEqual(str);

    const artwork3 = new Artwork('Game of Thrones', ArtworkType.serie);
    component.selectedArtworkType = ArtworkType.serie;
    component.selectedArtwork = artwork3;
    str = component.displayTextStartLecture();
    expect(component[serieDisplayStartText].replace(component[replaceValue], artwork3.title)).toEqual(str);

    const artwork4 = new Artwork('Batman Begins', ArtworkType.movie);
    component.selectedArtwork = artwork4;
    component.selectedArtworkType = ArtworkType.movie;
    str = component.displayTextStartLecture();
    expect(component[movieDisplayStartText].replace(component[replaceValue], artwork4.title)).toEqual(str);
  });

  it('startLecture', async () => {
    component.selectedArtwork = new Artwork();
    await component.startLecture();
    expect(mockConfigureLectureService.saveLecture).not.toHaveBeenCalled();
    expect(component[router].navigated).toBeFalse();

    component.selectedArtwork = artwork1;
    await component.startLecture();
    expect(mockConfigureLectureService.saveLecture).toHaveBeenCalled();
    expect(component[router].navigated).toBeTrue();
  });

  it('backToHome', async () => {
    expect(component[router].navigated).toBeFalse();
    await component.backToHome();
    expect(component[router].navigated).toBeTrue();

  });

  it('resetStartLecture', () => {
    component.lecture.startPage = '3';
    expect(component.lecture.startPage).toBeTruthy();
    component.resetStartLecture();
    expect(component.lecture.startPage).toBeFalsy();
  });

  it('private refreshArtworkList', async () => {
    component.selectedArtwork = artwork2;
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork1, artwork2]).toPromise());
    await component[refreshArtworkList]();
    expect(component.artworksList.length).toEqual(2);
    expect(component.selectedArtwork.id).toEqual(artwork2.id);
  });

  it('private getArtworksByArtworkType', async () => {
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork1, artwork2]).toPromise());
    await component[getArtworksByArtworkType]();
    expect(component.artworksList.length).toEqual(2);
  });

  it('private selectFirstArtwork', async () => {
    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([]).toPromise());
    await component[getArtworksByArtworkType]();
    await component[selectFirstArtwork]();
    expect(component.artworksList.length).toEqual(0);
    expect(component.selectedArtwork.title).toBeFalsy();

    await mockConfigureLectureService.findArtworksByType.and.returnValue(of([artwork1, artwork2]).toPromise());
    await component[getArtworksByArtworkType]();
    await component[selectFirstArtwork]();
    expect(component.artworksList.length).toEqual(2);
    expect(component.selectedArtwork.title).toEqual(artwork1.title);

  });
});
