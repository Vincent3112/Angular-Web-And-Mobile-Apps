import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaidDebtsPage } from './paid-debts.page';

const routes: Routes = [
  {
    path: '',
    component: PaidDebtsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaidDebtsPage]
})
export class PaidDebtsPageModule {}
