import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LectureHeaderComponent } from './lecture-header.component';

describe('LectureHeaderComponent', () => {
  let component: LectureHeaderComponent;
  let fixture: ComponentFixture<LectureHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureHeaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LectureHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('actionButton', () => {
    const spy = spyOn(component.actionButtonEmitter, 'emit');
    expect(spy).not.toHaveBeenCalled();
    component.actionButton();
    expect(spy).toHaveBeenCalled();
  });
});
