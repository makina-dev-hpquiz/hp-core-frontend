import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewAnswerPage } from './newAnswer.page';

import { NewAnswerPageRoutingModule } from './newAnswer-routing.module';
import { ComponentsModule } from 'src/app/components/ComponentsModule';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NewAnswerPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewAnswerPage]
})
export class NewAnswerPageModule {}
