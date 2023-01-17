import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupsPage } from './groups.page';

import { GroupsPageRoutingModule } from './groups-routing.module';
import { LectureComponentsModule } from 'src/app/pages/lecture/components/lecture-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // RouterModule.forChild([{ path: '', component: GroupsPage }]),
    GroupsPageRoutingModule,
    LectureComponentsModule
  ],
  declarations: [GroupsPage],
})
export class GroupsPageModule {}
