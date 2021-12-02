import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupsPage } from './groups.page';

import { GroupsPageRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: GroupsPage }]),
    GroupsPageRoutingModule,
  ],
  declarations: [GroupsPage]
})
export class GroupsPageModule {}
