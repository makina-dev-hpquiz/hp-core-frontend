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
import { Question } from 'src/entities/Question';

//Méthode privée
const questionIsValid = 'questionIsValid';


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

    expect(component.questionTitleInput.ionFocus).toBeTruthy();
  });

  it('createNewQuestion', async () => {

    spyOn(component.questionTitleInput, 'setFocus');
    expect(component.questionTitleInput.setFocus).not.toHaveBeenCalled();
    component.createNewQuestion();
    expect(component.question.type).toEqual(TypeQuestion.question);
    expect(component.question.difficulty).toEqual(Difficulty.moyen);
    expect(component.duplicatedTitle).toEqual('');
    expect(component.qcmRep[0]).toEqual('');


    expect(component.questionTitleInput.setFocus).toHaveBeenCalled();

  });

  it('ionViewDidEnter', async () => {
    spyOn(component.questionTitleInput, 'setFocus');
    expect(component.questionTitleInput.setFocus).not.toHaveBeenCalled();
    component.ionViewDidEnter();
    expect(component.questionTitleInput.setFocus).toHaveBeenCalled();
  });

  it('addQuestion', () => {
    component.question.type = TypeQuestion.question;
    component.question.question = 'Question';
    component.question.answer = 'Réponse';
    spyOn(component, 'createNewQuestion');

    component.addQuestion();

    expect(mockLectureService.addQuestion).toHaveBeenCalled();
    expect(component.createNewQuestion).toHaveBeenCalled();
  });

  it('addQuestion QCM Question', () => {
    component.question.question = 'Question';
    component.question.type = TypeQuestion.qcm;
    component.qcmRep[0] = 'Réponse 1';
    component.qcmRep[1] = 'Réponse 2';
    component.qcmRep[2] = 'Réponse 3';
    component.qcmRep[3] = 'Réponse 4';
    spyOn(component, 'createNewQuestion');

    component.addQuestion();

    expect(component.question.answer).toContain(component.qcmRep[0]);
    expect(component.question.answer).toContain(component.qcmRep[1]);
    expect(component.question.answer).toContain(component.qcmRep[2]);
    expect(component.question.answer).toContain(component.qcmRep[3]);
    expect(mockLectureService.addQuestion).toHaveBeenCalled();
    expect(component.createNewQuestion).toHaveBeenCalled();
  });

  it('addInGroup', () => {
    component.question.type = TypeQuestion.question;
    component.question.question = 'Question';
    component.question.answer = 'Réponse';


    //TODO Sauvegarde en bdd

    spyOn(router, 'navigate');

    expect(router.navigate).not.toHaveBeenCalled();
    component.addInGroup();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('duplicateTitle', () => {
    //TODO A développer
  });

  it('questionIsValid', () => {
    component.question = new Question();
    expect(component[questionIsValid]()).toBeFalse();

    component.question.question = 'Question';
    expect(component[questionIsValid]()).toBeTrue();

    // component.question.question = 'Question';
    // expect(component[questionIsValid]()).toBeFalse();
    // component.question.answer = 'Réponse';
    // expect(component[questionIsValid]()).toBeTrue();
  });
});
