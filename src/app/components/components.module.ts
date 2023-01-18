import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
declarations: [MainHeaderComponent],
exports: [MainHeaderComponent],
imports: [IonicModule, CommonModule]
})
export class ComponentsModule {}
