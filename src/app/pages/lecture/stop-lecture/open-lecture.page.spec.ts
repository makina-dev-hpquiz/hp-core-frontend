import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { LectureService } from 'src/providers/lecture.service';

import { StopLecturePage } from './stop-lecture.page';
import { Navigation, Router } from '@angular/router';
import { Question } from 'src/entities/question';
import { Difficulty } from 'src/models/enums/difficultyEnum';
import { Lecture } from 'src/entities/lecture';
import { Artwork } from 'src/entities/artwork';

describe('openLecturePage', () => {
    let component: StopLecturePage;
    let fixture: ComponentFixture<StopLecturePage>;
    let mockLectureService: jasmine.SpyObj<LectureService>;

    let getCurrentNavigationSpy: jasmine.Spy<() => Navigation>;
    let router: Router;

    const artwork = new Artwork('HP1', 'Film');
    const lecture = new Lecture();
    lecture.id = 1;
    lecture.artwork = artwork;

    const q1 = new Question();
    q1.difficulty = Difficulty.difficile;
    const q2 = new Question();
    q2.difficulty = Difficulty.difficile;
    const q3 = new Question();
    q3.difficulty = Difficulty.difficile;
    const q4 = new Question();
    q4.difficulty = Difficulty.moyen;
    const q5 = new Question();
    q5.difficulty = Difficulty.facile;
    lecture.questions = new Array(q1, q2, q3, q4, q5);

    //Méthode privée
    const getCurrentNavigation = 'getCurrentNavigation';

    // Propriété privée
    const routerProp = 'router';

    beforeEach(waitForAsync(() => {

        mockLectureService = jasmine.createSpyObj<LectureService>('LectureService', ['loadLecture'],
        {lecture, questions: lecture.questions});

        TestBed.configureTestingModule({
            declarations: [StopLecturePage],
            imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
            providers: [
                {
                    provide: LectureService,
                    useValue: mockLectureService
                }
            ]
        }).compileComponents();
        router = TestBed.inject(Router);
        getCurrentNavigationSpy = spyOn(router, getCurrentNavigation).and.returnValue({ extras: { state: { lecture } } } as any);

        fixture = TestBed.createComponent(StopLecturePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.nbQuestions).toEqual(5);
        expect(component.nbQuestionPerDifficulty[0]).toEqual(1);
        expect(component.nbQuestionPerDifficulty[1]).toEqual(1);
        expect(component.nbQuestionPerDifficulty[2]).toEqual(3);
    });
});
