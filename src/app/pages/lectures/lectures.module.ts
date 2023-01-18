import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LecturesPageRoutingModule } from './lectures-routing.module';

import { LecturesPage } from './lectures.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LecturesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [LecturesPage]
})
export class LecturesPageModule {}
