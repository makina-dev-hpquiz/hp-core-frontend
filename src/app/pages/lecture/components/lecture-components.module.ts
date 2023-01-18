import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LectureHeaderComponent } from './lecture-header/lecture-header.component';

@NgModule({
declarations: [LectureHeaderComponent],
exports: [LectureHeaderComponent],
imports: [IonicModule, CommonModule]
})
export class LectureComponentsModule {}
