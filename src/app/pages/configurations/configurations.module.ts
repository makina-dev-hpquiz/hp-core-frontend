import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationsPageRoutingModule } from './configurations-routing.module';

import { ConfigurationsPage } from './configurations.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConfigurationsPage]
})
export class ConfigurationsPageModule {}
