import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { Artwork } from 'src/entities/artwork';
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
  )
 

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
    expect(artworks.length).toEqual(component['artworksList'].length);
  });
});
