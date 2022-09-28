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
        loadChildren: () => import('../listAnswers/listAnswers.module').then(m => m.ListAnswersPageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('../newAnswer/newAnswer.module').then(m => m.NewAnswerPageModule)
      },
      {
        path: 'detail',
        loadChildren: () => import('../newAnswer/newAnswer.module').then(m => m.NewAnswerPageModule)
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
