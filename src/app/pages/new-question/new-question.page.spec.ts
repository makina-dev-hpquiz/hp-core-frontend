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

  it('Adaptation des champs en fonction du type de question sélectionné', () => {
    component.question.type = TypeQuestion.question;

    expect(document.getElementsByName('questionTitleInput')).toBeTruthy();
    expect(document.getElementsByName('answerInput')).toBeTruthy();
    expect(document.getElementsByName('questionQcmInput').length).toEqual(0);
    expect(document.getElementsByName('questionLexicalInput').length).toEqual(0);
    expect(document.getElementsByName('chaudronInput').length).toEqual(0);
    expect(document.getElementsByName('debatInput').length).toEqual(0);
    expect(document.getElementsByName('speechInput').length).toEqual(0);
    expect(document.getElementsByName('gageInput').length).toEqual(0);
    expect(document.getElementsByName('questionVraiOuFauxInput').length).toEqual(0);
    expect(document.getElementsByName('questionAffirmationInput').length).toEqual(0);

    component.question.type = TypeQuestion.qcm;

    // expect(document.getElementsByName('questionTitleInput').length).toEqual(0);
    expect(document.getElementsByName('questionQcmInput')).toBeTruthy();
    expect(document.getElementsByName('rep1QcmInput')).toBeTruthy();
    expect(document.getElementsByName('rep2QcmInput')).toBeTruthy();
    expect(document.getElementsByName('rep3QcmInput')).toBeTruthy();
    expect(document.getElementsByName('rep4QcmInput')).toBeTruthy();
    expect(document.getElementsByName('questionLexicalInput').length).toEqual(0);
    expect(document.getElementsByName('chaudronInput').length).toEqual(0);
    expect(document.getElementsByName('debatInput').length).toEqual(0);
    expect(document.getElementsByName('speechInput').length).toEqual(0);
    expect(document.getElementsByName('gageInput').length).toEqual(0);
    expect(document.getElementsByName('questionVraiOuFauxInput').length).toEqual(0);
    expect(document.getElementsByName('questionAffirmationInput').length).toEqual(0);



    component.question.type = TypeQuestion.lexical;

    // expect(document.getElementsByName('questionTitleInput').length).toEqual(0);
    expect(document.getElementsByName('questionQcmInput').length).toEqual(0);
    expect(document.getElementsByName('questionLexicalInput')).toBeTruthy();
    expect(document.getElementsByName('answerLexicalInput')).toBeTruthy();
    expect(document.getElementsByName('chaudronInput').length).toEqual(0);
    expect(document.getElementsByName('debatInput').length).toEqual(0);
    expect(document.getElementsByName('speechInput').length).toEqual(0);
    expect(document.getElementsByName('gageInput').length).toEqual(0);
    expect(document.getElementsByName('questionVraiOuFauxInput').length).toEqual(0);
    expect(document.getElementsByName('questionAffirmationInput').length).toEqual(0);

    component.question.type = TypeQuestion.chaudron;

    // expect(document.getElementsByName('questionTitleInput').length).toEqual(0);
    expect(document.getElementsByName('questionQcmInput').length).toEqual(0);
    expect(document.getElementsByName('questionLexicalInput').length).toEqual(0);
    expect(document.getElementsByName('chaudronInput')).toBeTruthy();
    expect(document.getElementsByName('debatInput').length).toEqual(0);
    expect(document.getElementsByName('speechInput').length).toEqual(0);
    expect(document.getElementsByName('gageInput').length).toEqual(0);
    expect(document.getElementsByName('questionVraiOuFauxInput').length).toEqual(0);
    expect(document.getElementsByName('questionAffirmationInput').length).toEqual(0);


    component.question.type = TypeQuestion.debat;

    // expect(document.getElementsByName('questionTitleInput').length).toEqual(0);
    expect(document.getElementsByName('questionQcmInput').length).toEqual(0);
    expect(document.getElementsByName('questionLexicalInput').length).toEqual(0);
    expect(document.getElementsByName('chaudronInput').length).toEqual(0);
    expect(document.getElementsByName('debatInput')).toBeTruthy();
    expect(document.getElementsByName('speechInput').length).toEqual(0);
    expect(document.getElementsByName('gageInput').length).toEqual(0);
    expect(document.getElementsByName('questionVraiOuFauxInput').length).toEqual(0);
    expect(document.getElementsByName('questionAffirmationInput').length).toEqual(0);


    component.question.type = TypeQuestion.speech;

    // expect(document.getElementsByName('questionTitleInput').length).toEqual(0);
    expect(document.getElementsByName('questionQcmInput').length).toEqual(0);
    expect(document.getElementsByName('questionLexicalInput').length).toEqual(0);
    expect(document.getElementsByName('chaudronInput').length).toEqual(0);
    expect(document.getElementsByName('debatInput').length).toEqual(0);
    expect(document.getElementsByName('speechInput')).toBeTruthy();
    expect(document.getElementsByName('gageInput').length).toEqual(0);
    expect(document.getElementsByName('questionVraiOuFauxInput').length).toEqual(0);
    expect(document.getElementsByName('questionAffirmationInput').length).toEqual(0);

    component.question.type = TypeQuestion.gage;

    // expect(document.getElementsByName('questionTitleInput').length).toEqual(0);
    expect(document.getElementsByName('questionQcmInput').length).toEqual(0);
    expect(document.getElementsByName('questionLexicalInput').length).toEqual(0);
    expect(document.getElementsByName('chaudronInput').length).toEqual(0);
    expect(document.getElementsByName('debatInput').length).toEqual(0);
    expect(document.getElementsByName('speechInput').length).toEqual(0);
    expect(document.getElementsByName('gageInput')).toBeTruthy();
    expect(document.getElementsByName('questionVraiOuFauxInput').length).toEqual(0);
    expect(document.getElementsByName('questionAffirmationInput').length).toEqual(0);

    component.question.type = TypeQuestion.vraiOuFaux;

    // expect(document.getElementsByName('questionTitleInput').length).toEqual(0);
    expect(document.getElementsByName('questionQcmInput').length).toEqual(0);
    expect(document.getElementsByName('questionLexicalInput').length).toEqual(0);
    expect(document.getElementsByName('chaudronInput').length).toEqual(0);
    expect(document.getElementsByName('debatInput').length).toEqual(0);
    expect(document.getElementsByName('speechInput').length).toEqual(0);
    expect(document.getElementsByName('gageInput').length).toEqual(0);
    expect(document.getElementsByName('questionVraiOuFauxInput')).toBeTruthy();
    expect(document.getElementsByName('answerVraiOuFauxInput')).toBeTruthy();
    expect(document.getElementsByName('questionAffirmationInput').length).toEqual(0);

    component.question.type = TypeQuestion.affirmation;

    // expect(document.getElementsByName('questionTitleInput').length).toEqual(0);
    expect(document.getElementsByName('questionQcmInput').length).toEqual(0);
    expect(document.getElementsByName('questionLexicalInput').length).toEqual(0);
    expect(document.getElementsByName('chaudronInput').length).toEqual(0);
    expect(document.getElementsByName('debatInput').length).toEqual(0);
    expect(document.getElementsByName('speechInput').length).toEqual(0);
    expect(document.getElementsByName('gageInput').length).toEqual(0);
    expect(document.getElementsByName('questionVraiOuFauxInput').length).toEqual(0);
    expect(document.getElementsByName('questionAffirmationInput')).toBeTruthy();
    expect(document.getElementsByName('answerAffirmationInput')).toBeTruthy();
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
