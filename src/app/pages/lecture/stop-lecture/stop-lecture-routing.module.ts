import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StopLecturePage } from './stop-lecture.page';

const routes: Routes = [
  {
    path: '',
    component: StopLecturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StopLecturePageRoutingModule {}
