import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { LectureService } from 'src/providers/lecture.service';

import { StopLecturePage } from './stop-lecture.page';

describe('StopLecturePage', () => {
  let component: StopLecturePage;
  let fixture: ComponentFixture<StopLecturePage>;
  let mockLectureService: jasmine.SpyObj<LectureService>;

  beforeEach(waitForAsync(() => {

    mockLectureService = jasmine.createSpyObj<LectureService>('LectureService', [], {questions: []});


    TestBed.configureTestingModule({
      declarations: [ StopLecturePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: LectureService,
          useValue: mockLectureService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StopLecturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
