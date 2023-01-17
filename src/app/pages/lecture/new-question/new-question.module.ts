import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewQuestionPage } from './new-question.page';

import { NewQuestionPageRoutingModule } from './new-question-routing.module';
import { LectureComponentsModule } from 'src/app/pages/lecture/components/lecture-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NewQuestionPageRoutingModule,
    LectureComponentsModule
  ],
  declarations: [NewQuestionPage]
})
export class NewQuestionPageModule {}
