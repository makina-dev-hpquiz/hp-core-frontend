import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ArtworkDaoService } from 'src/providers/dao/artwork-dao.service';
import { LectureDaoService } from 'src/providers/dao/lecture-dao.service';

import { LecturesPage } from './lectures.page';
import { QuestionDaoService } from 'src/providers/dao/question-dao.service';
import { Lecture } from 'src/entities/lecture';
import { of } from 'rxjs';
import { Artwork } from 'src/entities/artwork';
import { Question } from 'src/entities/question';

//Méthode privée
const getLectures = 'getLectures';
const getArtworks = 'getArtworks';
const sortLectures = 'sortLectures';
const getQuestions = 'getQuestions';

describe('LecturesPage', () => {
  let component: LecturesPage;
  let fixture: ComponentFixture<LecturesPage>;

  let mockLectureDaoService: jasmine.SpyObj<LectureDaoService>;
  let mockArtworkDaoService: jasmine.SpyObj<ArtworkDaoService>;
  let mockQuestionDaoService: jasmine.SpyObj<QuestionDaoService>;

  const lecture1 = new Lecture();
  lecture1.id = 1;
  const lecture2 = new Lecture();
  lecture2.id = 2;

  const artwork = new Artwork('HP1', 'Film');
  artwork.id = 1;

  const lectures = new Array(lecture1, lecture2);

  beforeEach(waitForAsync(async () => {
    mockLectureDaoService = jasmine.createSpyObj<LectureDaoService>('LectureDaoService',
      ['findAll', 'findAllByArtwork']);
    mockArtworkDaoService = jasmine.createSpyObj<ArtworkDaoService>('ArtworkDaoService', ['findAll']);
    mockQuestionDaoService = jasmine.createSpyObj<QuestionDaoService>('QuestionDaoService', ['findAllByLecture']);

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
        },
        {
          provide: QuestionDaoService,
          useValue: mockQuestionDaoService
        }
      ]
    }).compileComponents();
    await mockArtworkDaoService.findAll.and.returnValues(of([artwork]).toPromise());
    await mockLectureDaoService.findAll.and.returnValues(of(lectures).toPromise());
    await mockLectureDaoService.findAllByArtwork.and.returnValues(of([lecture1]).toPromise());

    fixture = TestBed.createComponent(LecturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create',() => {
    expect(component).toBeTruthy();
  });

  it('LecturePage.changeSelectedArtwork', async () => {
    await mockLectureDaoService.findAllByArtwork.and.returnValues(of([lecture1]).toPromise());
    await mockLectureDaoService.findAll.and.returnValues(of(lectures).toPromise());
    await mockQuestionDaoService.findAllByLecture.and.returnValues(of([new Question()]).toPromise());

    component.selectedArtwork = new Artwork();
    await component.changeSelectedArtwork();
    expect(component.lectures.length).toEqual(2);
    expect(component.lectures[0].questions.length).toEqual(1);

    component.selectedArtwork = artwork;
    await mockQuestionDaoService.findAllByLecture.and.returnValues(of([new Question(), new Question()]).toPromise());
    await component.changeSelectedArtwork();
    expect(component.lectures.length).toEqual(1);
    expect(component.lectures[0].questions.length).toEqual(2);
  });

  it('Private LecturePage.getLectures sans artwork sélectionné', async () => {
    await mockLectureDaoService.findAll.and.returnValues(of(lectures).toPromise());
    await mockQuestionDaoService.findAllByLecture.and.returnValues(of([new Question(), new Question()]).toPromise());

    component.selectedArtwork = new Artwork();
    await component[getLectures]();
    expect(component.lectures.length).toEqual(2);
    expect(component.lectures[0].questions.length).toEqual(2);
  });

  it('Private LecturePage.getLectures avec 1 artwork selectionné ', async () => {
    await mockLectureDaoService.findAllByArtwork.and.returnValues(of([lecture1]).toPromise());
    await mockQuestionDaoService.findAllByLecture.and.returnValues(of([new Question()]).toPromise());

    component.selectedArtwork = artwork;
    await component[getLectures]();
    expect(component.lectures.length).toEqual(1);
    expect(component.lectures[0].questions.length).toEqual(1);
  });
  
  it('Private LecturePage.getQuestions', async () => {
    await mockLectureDaoService.findAllByArtwork.and.returnValues(of([lecture1]).toPromise());
    await mockQuestionDaoService.findAllByLecture.and.returnValues(of([new Question(), new Question()]).toPromise());
    await component[getQuestions]();
    
    expect(component.lectures[0].questions.length).toEqual(2);
  });

  it('Private LecturePage.sortLectures', async () => {
    let lecture3 = new Lecture();
    lecture3.id = 3;

    component.selectedArtwork = new Artwork();
    await mockLectureDaoService.findAll.and.returnValues(of([lecture1, lecture3]).toPromise());
    await component[getLectures]();
    component[sortLectures]();

    expect(component.lectures.length).toEqual(2);
    expect(component.lectures[0].id).toEqual(lecture3.id);
    expect(component.lectures[1].id).toEqual(lecture1.id);
  });


  it('Private LecturePage.getQuestions', async () => {
    await mockLectureDaoService.findAllByArtwork.and.returnValues(of([lecture1]).toPromise());
    await mockQuestionDaoService.findAllByLecture.and.returnValues(of([new Question(), new Question()]).toPromise());
    await component[getQuestions]();

    expect(component.lectures[0].questions.length).toEqual(2);
  });

  it('Private LecturePage.sortLectures', async () => {
    const lecture3 = new Lecture();
    lecture3.id = 3;

    component.selectedArtwork = new Artwork();
    await mockLectureDaoService.findAll.and.returnValues(of([lecture1, lecture3]).toPromise());
    await component[getLectures]();
    component[sortLectures]();

    expect(component.lectures.length).toEqual(2);
    expect(component.lectures[0].id).toEqual(lecture3.id);
    expect(component.lectures[1].id).toEqual(lecture1.id);
  });


  it('Private LecturePage.getArtworks', async () => {
    await mockArtworkDaoService.findAll.and.returnValues(of([artwork]).toPromise());
    await component[getArtworks]();
    expect(component.artworks.length).toEqual(2);
  });


});
