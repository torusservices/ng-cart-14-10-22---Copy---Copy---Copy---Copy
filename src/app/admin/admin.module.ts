import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MetalsApiComponent } from './metals-api/metals-api.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [MetalsApiComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
