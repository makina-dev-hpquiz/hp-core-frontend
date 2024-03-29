import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonAccordionGroup, IonicModule } from '@ionic/angular';

import { NewQuestionPage } from './new-question.page';
import { routes } from 'src/app/app-routing.module';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { LectureService } from 'src/providers/lecture.service';
import { Navigation, Router } from '@angular/router';
import { Difficulty, difficultyList } from 'src/models/enums/difficultyEnum';
import { TypeQuestion, typeQuestionList } from 'src/models/enums/typeQuestionEnum';
import { Question } from 'src/entities/question';
import { ToasterService } from 'src/providers/toaster.service';

//Méthode privée
const saveQuestion = 'saveQuestion';
const createNewQuestion = 'createNewQuestion';
const getCurrentNavigation = 'getCurrentNavigation';
const closeAccordion = 'closeAccordion';

// Propriété privée
const lectureService = 'lectureService';
const routerProp = 'router';


describe('NewQuestionPage', () => {
  let component: NewQuestionPage;
  let fixture: ComponentFixture<NewQuestionPage>;

  let mockLectureService: jasmine.SpyObj<LectureService>;
  let mockScreenOrientation: jasmine.SpyObj<ScreenOrientation>;
  let getCurrentNavigationSpy: jasmine.Spy<() => Navigation>;
  let mockToasterService: jasmine.SpyObj<ToasterService>;
  let presentSpy;
  let router: Router;

  beforeEach(waitForAsync(async () => {
    mockScreenOrientation = jasmine.createSpyObj<ScreenOrientation>('ScreenOrientation', ['unlock']);
    mockLectureService = jasmine.createSpyObj<LectureService>('LectureService',
    ['initialize', 'addQuestion', 'updateQuestion', 'deleteQuestion']);
    presentSpy = jasmine.createSpy('present');

    mockToasterService = jasmine.createSpyObj<ToasterService>('ToasterService', ['getSuccessToast', 'getDangerToast']);

    TestBed.configureTestingModule({
      declarations: [NewQuestionPage,
        IonAccordionGroup
      ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: LectureService,
          useValue: mockLectureService
        },
        {
          provide: ScreenOrientation,
          useValue: mockScreenOrientation
        },
        {
          provide: ToasterService,
          useValue: mockToasterService
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    getCurrentNavigationSpy = spyOn(router, getCurrentNavigation).and.returnValue({ extras: { state: { initialize: true} } } as any);
    mockToasterService.getSuccessToast.and.returnValue({present: presentSpy} as any);
    mockToasterService.getDangerToast.and.returnValue({present: presentSpy} as any);

    fixture = TestBed.createComponent(NewQuestionPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
    jasmine.getEnv().allowRespy(true);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.updateState).toBeFalse();
    expect(component.difficulties).toEqual(difficultyList);
    expect(component.questionsType).toEqual(typeQuestionList);
    expect(component.question.type).toEqual(TypeQuestion.question);
    expect(component.question.difficulty).toEqual(Difficulty.moyen);

    expect(component.questionTitleInput.ionFocus).toBeTruthy();
  });


  it('createNewQuestion', async () => {
    component.accordionGroup = jasmine.createSpyObj<IonAccordionGroup>('accordionGroup', [], {value: 'test'}) as IonAccordionGroup;

    spyOn(component.questionTitleInput, 'setFocus');
    expect(component.questionTitleInput.setFocus).not.toHaveBeenCalled();
    spyOn<any>(component, closeAccordion);

    component[createNewQuestion]();
    expect(component.question.type).toEqual(TypeQuestion.question);
    expect(component.question.difficulty).toEqual(Difficulty.moyen);
    expect(component.qcmRep[0]).toEqual('');

    expect(component.questionTitleInput.setFocus).toHaveBeenCalled();
    expect(component[closeAccordion]).toHaveBeenCalled();
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

  it('addQuestion en création', async () => {
    component.question.type = TypeQuestion.question;
    component.question.question = 'Question';
    component.question.answer = 'Réponse';
    spyOn<any>(component, createNewQuestion);

    await component.addQuestion();
    expect(mockLectureService.addQuestion).toHaveBeenCalled();
    expect(component[createNewQuestion]).toHaveBeenCalled();
    expect(mockToasterService.getSuccessToast).toHaveBeenCalled();
  });

  it('addQuestion en modification', async () => {
    component.question.type = TypeQuestion.question;
    component.question.question = 'Question';
    component.question.answer = 'Réponse';
    spyOn<any>(component, createNewQuestion);
    component.updateState = true;

    await component.addQuestion();
    expect(mockLectureService.updateQuestion).toHaveBeenCalled();
    expect(component[createNewQuestion]).not.toHaveBeenCalled();
    expect(mockToasterService.getSuccessToast).toHaveBeenCalled();
  });


  it('addQuestion QCM Question', async () => {
    component.question.question = 'Question';
    component.question.type = TypeQuestion.qcm;
    component.qcmRep[0] = 'Réponse 1';
    component.qcmRep[1] = 'Réponse 2';
    component.qcmRep[2] = 'Réponse 3';
    component.qcmRep[3] = 'Réponse 4';
    spyOn<any>(component, createNewQuestion);

    await component.addQuestion();

    expect(component.question.answer).toContain(component.qcmRep[0]);
    expect(component.question.answer).toContain(component.qcmRep[1]);
    expect(component.question.answer).toContain(component.qcmRep[2]);
    expect(component.question.answer).toContain(component.qcmRep[3]);
    expect(mockLectureService.addQuestion).toHaveBeenCalled();
    expect(component[createNewQuestion]).toHaveBeenCalled();
    expect(mockToasterService.getSuccessToast).toHaveBeenCalled();
  });

  it('addQuestion avec incomplète question', async () => {
    component.question = new Question();
    await component.addQuestion();

    expect(mockToasterService.getDangerToast).toHaveBeenCalled();
  });

  it('addInGroup', async () => {
    component.question.type = TypeQuestion.question;
    component.question.question = 'Question';
    component.question.answer = 'Réponse';
    component.question.difficulty = Difficulty.difficile;
    component[lectureService].questions = new Array<Question>();
    component[lectureService].questions.push(component.question);

    const saveQuestionSpy = spyOn<any>(component, saveQuestion);
    const createNewQuestionSpy = spyOn<any>(component, createNewQuestion);
    const navigateSpy = spyOn<any>(component[routerProp], 'navigate');

    expect(saveQuestionSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(createNewQuestionSpy).not.toHaveBeenCalled();
    await component.addInGroup();

    expect(component[saveQuestion]).toHaveBeenCalled();
    expect(component[createNewQuestion]).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('Duplique une question ', async () => {
    const saveQuestionSpy = spyOn<any>(component, saveQuestion);
    expect(saveQuestionSpy).not.toHaveBeenCalled();
    await component.duplicate();
    expect(saveQuestionSpy).toHaveBeenCalled();
  });

  it('Duplique une question existante', async () => {
    component.updateState = true;
    const saveQuestionSpy = spyOn<any>(component, saveQuestion);
    expect(saveQuestionSpy).not.toHaveBeenCalled();
    expect(component.updateState).toBeTrue();
    await component.duplicate();
    expect(saveQuestionSpy).toHaveBeenCalled();
    expect(component.updateState).toBeFalse();
  });

  it('typeChange', () => {
    component.question.question = 'Question';
    component.question.answer = 'Réponse';
    component.qcmRep = ['1', '2', '3', '4'];
    expect(component.question.question).toBeTruthy();
    expect(component.question.answer).toBeTruthy();
    expect(component.qcmRep[0]).toBeTruthy();
    expect(component.qcmRep[1]).toBeTruthy();
    expect(component.qcmRep[2]).toBeTruthy();
    expect(component.qcmRep[3]).toBeTruthy();

    component.typeChange();
    expect(component.question.question).toBeFalsy();
    expect(component.question.answer).toBeFalsy();
    expect(component.qcmRep[0]).toBeFalsy();
    expect(component.qcmRep[1]).toBeFalsy();
    expect(component.qcmRep[2]).toBeFalsy();
    expect(component.qcmRep[3]).toBeFalsy();
  });

  it('questionIsValid', () => {
    component.question = new Question();
    expect(component.questionIsValid()).toBeFalse();

    // Question / Lexical / Vrai ou faux / Affirmation
    component.question.question = 'Question';
    expect(component.questionIsValid()).toBeFalse();
    component.question.answer = 'Réponse';
    expect(component.questionIsValid()).toBeFalse();
    component.question.type = TypeQuestion.question;
    expect(component.questionIsValid()).toBeFalse();
    component.question.difficulty = Difficulty.facile;
    expect(component.questionIsValid()).toBeTrue();

    component.question.type = TypeQuestion.qcm;
    expect(component.questionIsValid()).toBeFalse();
    component.question.type = TypeQuestion.lexical;
    expect(component.questionIsValid()).toBeTrue();
    component.question.type = TypeQuestion.vraiOuFaux;
    expect(component.questionIsValid()).toBeTrue();
    component.question.type = TypeQuestion.affirmation;
    expect(component.questionIsValid()).toBeTrue();

    component.question.answer = '';
    component.question.question = '';
    component.question.difficulty = '';
    // Chaufron / Debat / Speech / Gage
    component.question.type = TypeQuestion.chaudron;
    expect(component.questionIsValid()).toBeFalse();
    component.question.difficulty = Difficulty.facile;
    expect(component.questionIsValid()).toBeFalse();
    component.question.question = 'Question';
    expect(component.questionIsValid()).toBeTrue();
    component.question.type = TypeQuestion.debat;
    expect(component.questionIsValid()).toBeTrue();
    component.question.type = TypeQuestion.speech;
    expect(component.questionIsValid()).toBeTrue();
    component.question.type = TypeQuestion.gage;
    expect(component.questionIsValid()).toBeTrue();


    component.question.answer = '';
    component.question.question = '';
    component.question.difficulty = '';
    // QCM
    component.question.type = TypeQuestion.qcm;
    expect(component.questionIsValid()).toBeFalse();
    component.question.difficulty = Difficulty.facile;
    expect(component.questionIsValid()).toBeFalse();
    component.question.question = 'Question';
    expect(component.questionIsValid()).toBeFalse();
    component.question.answer = 'Réponse';
    expect(component.questionIsValid()).toBeFalse();
    component.qcmRep[0] = '1';
    expect(component.questionIsValid()).toBeFalse();
    component.qcmRep[1] = '2';
    expect(component.questionIsValid()).toBeFalse();
    component.qcmRep[2] = '3';
    expect(component.questionIsValid()).toBeFalse();
    component.qcmRep[3] = '4';
    expect(component.questionIsValid()).toBeTrue();
    component.question.answer = '';
    expect(component.questionIsValid()).toBeTrue();
  });

  it('private saveQuestion en création', async () => {
    component.question.question = 'Question';
    component.question.type = TypeQuestion.qcm;
    component.qcmRep[0] = 'Réponse 1';
    component.qcmRep[1] = 'Réponse 2';
    component.qcmRep[2] = 'Réponse 3';
    component.qcmRep[3] = 'Réponse 4';
    spyOn<any>(component, createNewQuestion);

    await component[saveQuestion]();

    expect(component.question.answer).toContain(component.qcmRep[0]);
    expect(component.question.answer).toContain(component.qcmRep[1]);
    expect(component.question.answer).toContain(component.qcmRep[2]);
    expect(component.question.answer).toContain(component.qcmRep[3]);
    expect(mockLectureService.addQuestion).toHaveBeenCalled();
  });

  it('private saveQuestion en modification', async () => {
    component.question.question = 'Question';
    component.question.type = TypeQuestion.qcm;
    component.qcmRep[0] = 'Réponse 1';
    component.qcmRep[1] = 'Réponse 2';
    component.qcmRep[2] = 'Réponse 3';
    component.qcmRep[3] = 'Réponse 4';
    spyOn<any>(component, createNewQuestion);
    component.updateState = true;

    await component[saveQuestion]();

    expect(component.question.answer).toContain(component.qcmRep[0]);
    expect(component.question.answer).toContain(component.qcmRep[1]);
    expect(component.question.answer).toContain(component.qcmRep[2]);
    expect(component.question.answer).toContain(component.qcmRep[3]);
    expect(mockLectureService.updateQuestion).toHaveBeenCalled();
  });


});
