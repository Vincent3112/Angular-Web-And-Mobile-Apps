import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'welcome',
        loadChildren: '../welcome/welcome.module#WelcomePageModule'
      },
      {
        path: 'creditors',
        loadChildren: '../creditors/creditors.module#CreditorsPageModule'
      },
      {
        path: 'debts',
        loadChildren: '../debts/debts.module#DebtsPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
