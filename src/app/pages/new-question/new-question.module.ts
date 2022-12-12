import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewQuestionPage } from './new-question.page';

import { NewQuestionPageRoutingModule } from './new-question-routing.module';
import { ComponentsModule } from 'src/app/components/ComponentsModule';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NewQuestionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewQuestionPage]
})
export class NewQuestionPageModule {}
