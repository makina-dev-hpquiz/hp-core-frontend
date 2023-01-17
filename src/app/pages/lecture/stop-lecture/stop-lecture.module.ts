import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StopLecturePageRoutingModule } from './stop-lecture-routing.module';

import { StopLecturePage } from './stop-lecture.page';
import { LectureComponentsModule } from 'src/app/pages/lecture/components/lecture-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StopLecturePageRoutingModule,
    LectureComponentsModule
  ],
  declarations: [StopLecturePage]
})
export class StopLecturePageModule {}
