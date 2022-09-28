import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';

@NgModule({
declarations: [HeaderComponent],
exports: [HeaderComponent],
imports: [IonicModule]
})
export class ComponentsModule {}
