import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { ArtworkModel } from 'src/models/artwork.model';
import { ArtworkDaoService } from 'src/providers/dao/artwork-dao.service';
import { LectureDaoService } from 'src/providers/dao/lecture-dao.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let mockLectureDaoService: jasmine.SpyObj<LectureDaoService>;
  let mockArtworkDaoService: jasmine.SpyObj<ArtworkDaoService>;

  const artworks = new Array(
    new Artwork('HP1', 'Film'),
    new Artwork('HP2', 'Film')
  );

  const lectures = new Array(
    new Lecture(),
    new Lecture(),
    new Lecture(),
  );

  const lecturesStr = 'lectures';
  const sortByRecent = 'sortByRecent';


  beforeEach(waitForAsync(() => {

    mockLectureDaoService = jasmine.createSpyObj<LectureDaoService>('LectureDaoService', ['findAllByArtwork']);
    mockArtworkDaoService = jasmine.createSpyObj<ArtworkDaoService>('ArtworkDaoService', ['findAll']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
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

    mockArtworkDaoService.findAll.and.returnValue(of(artworks).toPromise());
    mockLectureDaoService.findAllByArtwork.and.returnValue(of(lectures).toPromise());

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('countNbOfAnswersForSelectedDifficulty', () => {
    //TODO
  });

  it('home.getArtworks récupéation des oeuvres',async () => {
    await component.getArtworks();
    expect(artworks.length).toEqual(component.artworksList.length);
    expect(lectures.length).toEqual(component.artworksList[0][lecturesStr].length);
  });

  it('sortByRecent', () =>{

    const artworksList = new Array(
      new ArtworkModel(artworks[0]),
      new ArtworkModel(artworks[1]),
    );

    artworksList[1].dateRecentLecture = new Date();

    component.artworksList = artworksList;
    component[sortByRecent]();
    expect(component.artworksList[0].title).toEqual('HP2');

  });
});
