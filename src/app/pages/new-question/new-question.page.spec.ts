import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { NewQuestionPage } from './new-question.page';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { LectureService } from 'src/providers/lecture.service';
import { Router } from '@angular/router';
import { Difficulty, difficultyList } from 'src/models/enums/difficultyEnum';
import { TypeQuestion, typeQuestionList } from 'src/models/enums/typeQuestionEnum';


describe('NewQuestionPage', () => {
  let component: NewQuestionPage;
  let fixture: ComponentFixture<NewQuestionPage>;

  let mockLectureService: jasmine.SpyObj<LectureService>;
  let mockScreenOrientation: jasmine.SpyObj<ScreenOrientation>;

  let router: Router;

  beforeEach(waitForAsync(() => {
    mockScreenOrientation = jasmine.createSpyObj<ScreenOrientation>('ScreenOrientation', ['unlock']);
    mockLectureService = jasmine.createSpyObj<LectureService>('LectureService',
    ['initialize', 'addQuestion', 'updateQuestion', 'deleteQuestion']);


    TestBed.configureTestingModule({
      declarations: [NewQuestionPage],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: LectureService,
          useValue: mockLectureService
        },
        {
          provide: ScreenOrientation,
          useValue: mockScreenOrientation
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: undefined } } as any);

    fixture = TestBed.createComponent(NewQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockScreenOrientation.unlock).toHaveBeenCalled();
    expect(component.updateState).toBeFalse();
    expect(component.difficulties).toEqual(difficultyList);
    expect(component.questionsType).toEqual(typeQuestionList);
    expect(component.question.type).toEqual(TypeQuestion.question);
    expect(component.question.difficulty).toEqual(Difficulty.moyen);
  });
});
