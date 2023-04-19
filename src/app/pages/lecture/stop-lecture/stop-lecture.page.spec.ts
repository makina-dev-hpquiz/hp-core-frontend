import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { LectureService } from 'src/providers/lecture.service';

import { StopLecturePage } from './stop-lecture.page';
import { Navigation, Router } from '@angular/router';
import { Question } from 'src/entities/question';
import { Difficulty } from 'src/models/enums/difficultyEnum';

describe('StopLecturePage', () => {
  let component: StopLecturePage;
  let fixture: ComponentFixture<StopLecturePage>;
  let mockLectureService: jasmine.SpyObj<LectureService>;

  let getCurrentNavigationSpy: jasmine.Spy<() => Navigation>;
  let router: Router;

  //Méthode privée
  const getCurrentNavigation = 'getCurrentNavigation';
  const calculateQuestionsNumber = 'calculateQuestionsNumber';

  // Propriété privée
  const routerProp = 'router';


  beforeEach(waitForAsync(() => {
    const q1 = new Question();
    q1.difficulty = Difficulty.moyen;
    const q2 = new Question();
    q2.difficulty = Difficulty.moyen;
    const q3 = new Question();
    q3.difficulty = Difficulty.moyen;
    const q4 = new Question();
    q4.difficulty = Difficulty.moyen;
    const q5 = new Question();
    q5.difficulty = Difficulty.difficile;
    const q6 = new Question();
    q6.difficulty = Difficulty.difficile;
    const q7 = new Question();
    q7.difficulty = Difficulty.facile;
    mockLectureService = jasmine.createSpyObj<LectureService>('LectureService', [], {questions: [q1, q2, q3, q4, q5, q6, q7]});


    TestBed.configureTestingModule({
      declarations: [ StopLecturePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: LectureService,
          useValue: mockLectureService
        }
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
    getCurrentNavigationSpy = spyOn(router, getCurrentNavigation).and.returnValue({ extras: { } } as any);

    fixture = TestBed.createComponent(StopLecturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Stop lecture', async () => {
    expect(component[routerProp].navigated).toBeFalse();
    await component.stopLecture();
    expect(component[routerProp].navigated).toBeTrue();
  });

  it('Private calculateQuestionsNumber', () => {
    component[calculateQuestionsNumber]();

    expect(component.nbQuestions).toEqual(7);
    expect(component.nbQuestionPerDifficulty[0]).toEqual(1);
    expect(component.nbQuestionPerDifficulty[1]).toEqual(4);
    expect(component.nbQuestionPerDifficulty[2]).toEqual(2);
  });

});
