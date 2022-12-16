import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ListQuestionsPage } from './list-questions.page';
import { routes } from 'src/app/app-routing.module';
import { LectureService } from 'src/providers/lecture.service';
import { Question } from 'src/entities/Question';
import { TypeQuestion, typeQuestionList } from 'src/models/enums/typeQuestionEnum';
import { Difficulty } from 'src/models/enums/difficultyEnum';


//Private methods
const sortQuestions = 'sortQuestions';

//Private properties


describe('ListQuestionsPage', () => {
  let component: ListQuestionsPage;
  let fixture: ComponentFixture<ListQuestionsPage>;

  let mockLectureService: jasmine.SpyObj<LectureService>;
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
    mockLectureService = jasmine.createSpyObj<LectureService>('LectureService', [], {questions});

    TestBed.configureTestingModule({
      declarations: [ListQuestionsPage],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: LectureService,
          useValue: mockLectureService
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

  });

  it('getMiniNameType', () => {
    let typesList = typeQuestionList;
    let lettreListExpected = ['Q', 'Qc', 'L', 'C', 'D', 'S', 'G', 'V', 'A'];

    let i = 0;
    typesList.forEach(type => {
      expect(component.getMiniNameType(type)).toEqual(lettreListExpected[i]);
      i++;
    })
  });

  it('filter', () => {

  });

  it('private sortQuestions', () => {
    let q4 = new Question();
    q4.id = '4';
    q4.type = TypeQuestion.affirmation;
    q4.difficulty = Difficulty.moyen;
    q4.question = 'Comment s\’appelle l\'oncle d\’Harry Potter?';
    
    questions.push(q4);
    component.questions = questions;
    component[sortQuestions]();

    expect(component.questions[0].id).toEqual(q4.id);
    expect(component.questions.length).toEqual(4);
  });
});
