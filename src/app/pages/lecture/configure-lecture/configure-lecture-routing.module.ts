import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigureLecturePage } from './configure-lecture.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigureLecturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigureLecturePageRoutingModule {}
