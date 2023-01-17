import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListQuestionsPage } from './list-questions.page';

import { ListQuestionsPageRoutingModule } from './list-questions-routing.module';
import { LectureComponentsModule } from 'src/app/pages/lecture/components/lecture-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListQuestionsPageRoutingModule,
    LectureComponentsModule
  ],
  declarations: [ListQuestionsPage]
})
export class ListQuestionsPageModule {}
