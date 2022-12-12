import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListQuestionsPage } from './list-questions.page';

import { ListQuestionsPageRoutingModule } from './list-questions-routing.module';
import { ComponentsModule } from 'src/app/components/ComponentsModule';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListQuestionsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListQuestionsPage]
})
export class ListQuestionsPageModule {}
