import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigureLecturePageRoutingModule } from './configure-lecture-routing.module';

import { ConfigureLecturePage } from './configure-lecture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigureLecturePageRoutingModule
  ],
  declarations: [ConfigureLecturePage]
})
export class ConfigureLecturePageModule {}
