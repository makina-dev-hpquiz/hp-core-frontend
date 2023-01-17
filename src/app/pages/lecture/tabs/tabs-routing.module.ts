import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../list-questions/list-questions.module').then(m => m.ListQuestionsPageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('../new-question/new-question.module').then(m => m.NewQuestionPageModule)
      },
      {
        path: 'detail',
        loadChildren: () => import('../new-question/new-question.module').then(m => m.NewQuestionPageModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('../groups/groups.module').then(m => m.GroupsPageModule)
      },
      {
        path: 'stop-lecture',
        loadChildren: () => import('../stop-lecture/stop-lecture.module').then(m => m.StopLecturePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/new',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/new',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
