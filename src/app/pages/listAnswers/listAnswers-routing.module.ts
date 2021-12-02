import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAnswersPage } from './listAnswers.page';

const routes: Routes = [
  {
    path: '',
    component: ListAnswersPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAnswersPageRoutingModule {}
