import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { routes } from 'src/app/app-routing.module';
import { LectureService } from 'src/providers/lecture.service';
import { GroupsPage } from './groups.page';

describe('GroupsPage', () => {
  let component: GroupsPage;
  let fixture: ComponentFixture<GroupsPage>;
  let mockLectureService: jasmine.SpyObj<LectureService>;

  let router: Router;

  beforeEach(waitForAsync(() => {
    mockLectureService = jasmine.createSpyObj<LectureService>('LectureService',
    ['refreshGroups', 'createGroupe', 'addQuestionInGroupe', 'removeQuestionsInGroupe'],
    {questions: [], groups: []});


    TestBed.configureTestingModule({
      declarations: [GroupsPage],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: LectureService,
          useValue: mockLectureService
        }
      ]
    }).compileComponents();


    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: undefined } } as any);

    fixture = TestBed.createComponent(GroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
