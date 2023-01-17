import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/lecture/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'stop-lecture',
    loadChildren: () => import('./pages/lecture/stop-lecture/stop-lecture.module').then( m => m.StopLecturePageModule)
  },
  {
    path: 'configure-lecture',
    loadChildren: () => import('./pages/lecture/configure-lecture/configure-lecture.module').then( m => m.ConfigureLecturePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
