import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListQuestionsPage } from './list-questions.page';

const routes: Routes = [
  {
    path: '',
    component: ListQuestionsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListQuestionsPageRoutingModule {}
