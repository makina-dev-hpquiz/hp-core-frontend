import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewAnswerPage } from './newAnswer.page';

import { NewAnswerPageRoutingModule } from './newAnswer-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NewAnswerPageRoutingModule
  ],
  declarations: [NewAnswerPage]
})
export class NewAnswerPageModule {}
