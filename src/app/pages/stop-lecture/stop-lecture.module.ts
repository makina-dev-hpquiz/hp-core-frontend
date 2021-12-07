import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StopLecturePageRoutingModule } from './stop-lecture-routing.module';

import { StopLecturePage } from './stop-lecture.page';
import { ComponentsModule } from 'src/app/components/ComponentsModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StopLecturePageRoutingModule,
    ComponentsModule
  ],
  declarations: [StopLecturePage]
})
export class StopLecturePageModule {}
