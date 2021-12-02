import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListAnswersPage } from './listAnswers.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ListAnswersPageRoutingModule } from './listAnswers-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ListAnswersPageRoutingModule
  ],
  declarations: [ListAnswersPage]
})
export class ListAnswersPageModule {}
