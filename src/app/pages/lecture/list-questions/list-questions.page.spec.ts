import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ListQuestionsPage } from './list-questions.page';
import { routes } from 'src/app/app-routing.module';
import { LectureService } from 'src/providers/lecture.service';
import { Question } from 'src/entities/question';
import { TypeQuestion, typeQuestionList } from 'src/models/enums/typeQuestionEnum';
import { Difficulty } from 'src/models/enums/difficultyEnum';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

//Private methods
const sortQuestions = 'sortQuestions';

//Private properties
const router = 'router';

describe('ListQuestionsPage', () => {
  let component: ListQuestionsPage;
  let fixture: ComponentFixture<ListQuestionsPage>;

  let mockLectureService: jasmine.SpyObj<LectureService>;
  let mockScreenOrientation: jasmine.SpyObj<ScreenOrientation>;

  const q1 = new Question();
  q1.id = '1';
  q1.type = TypeQuestion.question;
  q1.difficulty = Difficulty.moyen;
  q1.question = 'Comment s\’appelle le copain Roux d\’Harry Potter?';

  const q2 = new Question();
  q2.id = '2';
  q2.type = TypeQuestion.question;
  q2.difficulty = Difficulty.facile;
  q2.question = 'Comment s\’appelle la tante d\’Harry Potter?';

  const q3 = new Question();
  q3.id = '3';
  q3.type = TypeQuestion.affirmation;
  q3.difficulty = Difficulty.moyen;
  q3.question = 'Voldemort est le meilleur pote d\’Harry Potter ou Voldemort est le pire ennemi d\’Harry Potter';


  const questions: Question[] = [
    q1, q2, q3
  ];

  beforeEach(waitForAsync(() => {
    mockLectureService = jasmine.createSpyObj<LectureService>('LectureService', [], { questions });
    mockScreenOrientation = jasmine.createSpyObj<ScreenOrientation>('ScreenOrientation', ['lock']);

    TestBed.configureTestingModule({
      declarations: [ListQuestionsPage],
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

    fixture = TestBed.createComponent(ListQuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goToDetail', () => {
    const navigateSpy = spyOn(component[router], 'navigate');
    expect(navigateSpy).not.toHaveBeenCalled();
    component.goToDetail(q1);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('getMiniNameType', () => {
    const typesList = typeQuestionList;
    const lettreListExpected = ['Q', 'Qc', 'L', 'C', 'D', 'S', 'G', 'V', 'A'];

    let i = 0;
    typesList.forEach(type => {
      expect(component.getMiniNameType(type)).toEqual(lettreListExpected[i]);
      i++;
    });
  });

  it('filter', () => {
    if (questions.length < 4) {
      const q4 = new Question();
      q4.id = '4';
      q4.type = TypeQuestion.affirmation;
      q4.difficulty = Difficulty.moyen;
      q4.question = 'Comment s\’appelle l\'oncle d\’Harry Potter?';
      questions.push(q4);
    }

    component.questions = questions;

    component.keyword = '';
    component.filter();
    expect(component.questions.length).toEqual(4);

    component.keyword = 'oncle';
    component.filter();
    expect(component.questions.length).toEqual(1);
    component.keyword = '';
    component.filter();
    expect(component.questions.length).toEqual(4);

    component.keyword = 'appelle';
    component.filter();
    expect(component.questions.length).toEqual(3);

    component.keyword = '';
    component.filter();
    expect(component.questions.length).toEqual(4);
  });

  it('private sortQuestions', () => {
    const q4 = new Question();
    q4.id = '4';
    q4.type = TypeQuestion.affirmation;
    q4.difficulty = Difficulty.moyen;
    q4.question = 'Comment s\’appelle l\'oncle d\’Harry Potter?';
    questions.push(q4);

    component.questions = questions;
    component[sortQuestions]();

    expect(component.questions[0].id).toEqual(q4.id);
  });
});
