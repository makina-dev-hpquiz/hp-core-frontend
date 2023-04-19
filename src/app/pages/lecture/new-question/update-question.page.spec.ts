import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonAccordionGroup, IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { Lecture } from 'src/entities/lecture';
import { Question } from 'src/entities/question';
import { Difficulty } from 'src/models/enums/difficultyEnum';
import { TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { LectureService } from 'src/providers/lecture.service';
import { NewQuestionPage } from './new-question.page';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

//Méthode privée
const getCurrentNavigation = 'getCurrentNavigation';
const closeAccordion = 'closeAccordion';
const changeStatePage = 'changeStatePage';

//Propriété privée
const titleUpdateQuestion = 'titleUpdateQuestion';
const titleNewQuestion = 'titleNewQuestion';

describe('NewQuestionPage en modification', () => {
    let component: NewQuestionPage;
    let fixture: ComponentFixture<NewQuestionPage>;

    let mockLectureService: jasmine.SpyObj<LectureService>;
    let mockScreenOrientation: jasmine.SpyObj<ScreenOrientation>;
    let getCurrentNavigationSpy;
    let router: Router;

    let question = new Question();
    question.type = TypeQuestion.question;
    question.question = 'Question';
    question.answer = 'Réponse';
    question.difficulty = Difficulty.moyen;
    let lecture = new Lecture();
    lecture.id = 1;
    question.lecture = lecture;


    beforeEach(waitForAsync(async () => {
        mockScreenOrientation = jasmine.createSpyObj<ScreenOrientation>('ScreenOrientation', ['unlock']);
        mockLectureService = jasmine.createSpyObj<LectureService>('LectureService',
            ['initialize', 'addQuestion', 'updateQuestion', 'deleteQuestion']);
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
                }
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        getCurrentNavigationSpy = spyOn(router, getCurrentNavigation).and.returnValue(
            { extras: { state: { update: true, question } } } as any);

        fixture = TestBed.createComponent(NewQuestionPage);
        component = fixture.componentInstance;

        fixture.detectChanges();
    }));

    it('Accès à l\'écran avec une question existante', async () => {
        question = new Question();
        question.type = TypeQuestion.question;
        question.question = 'Question';
        question.answer = 'Réponse';
        question.difficulty = Difficulty.moyen;
        lecture = new Lecture();
        lecture.id = 1;
        question.lecture = lecture;

        await TestBed.compileComponents();
        getCurrentNavigationSpy.and.returnValue({ extras: { state: { update: true, question } } } as any);

        fixture = TestBed.createComponent(NewQuestionPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.updateState).toBeTrue();
        expect(component.qcmRep[0]).toEqual('');
        expect(component.question.id).toEqual(question.id);

    });

    it('Accès à l\'écran avec une question type QCM', async () => {
        question = new Question();
        question.type = TypeQuestion.qcm;
        question.question = 'Question';
        question.answer = 'R1/R2/R3/R4';
        question.difficulty = Difficulty.moyen;
        lecture = new Lecture();
        lecture.id = 1;
        question.lecture = lecture;

        await TestBed.compileComponents();
        getCurrentNavigationSpy.and.returnValue({ extras: { state: { update: true, question } } } as any);

        fixture = TestBed.createComponent(NewQuestionPage);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.updateState).toBeTrue();
        expect(component.qcmRep[0]).toEqual('R1');
        expect(component.question.id).toEqual(question.id);
    });

    it('private changeStatePage', async () => {
        expect(component.updateState).toBeTrue();
        expect(component.title).toEqual(component[titleUpdateQuestion]);
        component[changeStatePage]();

        expect(component.updateState).toBeFalse();
        expect(component.title).toEqual(component[titleNewQuestion]);
      });
});
