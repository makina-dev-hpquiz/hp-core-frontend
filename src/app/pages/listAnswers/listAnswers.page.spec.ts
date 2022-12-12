import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ListAnswersPage } from './listAnswers.page';
import { routes } from 'src/app/app-routing.module';
import { LectureService } from 'src/providers/lecture.service';
import { Question } from 'src/entities/Question';
import { TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { Difficulty } from 'src/models/enums/difficultyEnum';

describe('ListAnswersPage', () => {
  let component: ListAnswersPage;
  let fixture: ComponentFixture<ListAnswersPage>;

  let mockLectureService: jasmine.SpyObj<LectureService>;
  const q1 = new Question();
  q1.type = TypeQuestion.QUESTION;
  q1.difficulty = Difficulty.MOYEN;
  q1.question = 'Intitulé de la question';
  const questions: Question[] = [
    q1
  ];

  beforeEach(waitForAsync(() => {
    mockLectureService = jasmine.createSpyObj<LectureService>('LectureService', [], {questions});

    TestBed.configureTestingModule({
      declarations: [ListAnswersPage],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: LectureService,
          useValue: mockLectureService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAnswersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
