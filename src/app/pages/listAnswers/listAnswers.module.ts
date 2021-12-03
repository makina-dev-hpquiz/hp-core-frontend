import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListAnswersPage } from './listAnswers.page';

import { ListAnswersPageRoutingModule } from './listAnswers-routing.module';
import { ComponentsModule } from 'src/app/components/ComponentsModule';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListAnswersPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListAnswersPage]
})
export class ListAnswersPageModule {}
