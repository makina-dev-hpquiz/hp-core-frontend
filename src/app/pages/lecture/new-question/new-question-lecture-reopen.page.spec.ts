import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonAccordionGroup, IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { LectureService } from 'src/providers/lecture.service';
import { NewQuestionPage } from './new-question.page';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { TypeQuestion } from 'src/models/enums/typeQuestionEnum';
import { Lecture } from 'src/entities/lecture';
import { Difficulty } from 'src/models/enums/difficultyEnum';

describe('NewQuestionPage après réouverture d\'une lecture', () => {

    let component: NewQuestionPage;
    let fixture: ComponentFixture<NewQuestionPage>;

    let mockLectureService: jasmine.SpyObj<LectureService>;
    let mockScreenOrientation: jasmine.SpyObj<ScreenOrientation>;
    let getCurrentNavigationSpy;
    let router: Router;

    const lecture = new Lecture();
    lecture.id = 1;

    //Méthode privée
    const getCurrentNavigation = 'getCurrentNavigation';

    beforeEach(waitForAsync(async () => {
        mockScreenOrientation = jasmine.createSpyObj<ScreenOrientation>('ScreenOrientation', ['unlock']);
        mockLectureService = jasmine.createSpyObj<LectureService>('LectureService',
            ['initialize', 'addQuestion', 'updateQuestion', 'deleteQuestion'], {lecture});
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
        getCurrentNavigationSpy = spyOn(router, getCurrentNavigation).and.returnValue({ extras: {  } } as any);

        fixture = TestBed.createComponent(NewQuestionPage);
        component = fixture.componentInstance;

        fixture.detectChanges();
    }));

    it('L\'écran nouvelle question s\'ouvre correctement après la réouverture d\'une lecture', () => {
        expect(component).toBeTruthy();
        expect(component.updateState).toBeFalse();
        expect(component.question).toBeTruthy();
        expect(component.question.type).toEqual(TypeQuestion.question);
        expect(component.question.difficulty).toEqual(Difficulty.moyen);

    });
});
