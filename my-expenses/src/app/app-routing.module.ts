import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'new-creditor', loadChildren: './pages/creditors/new-creditor/new-creditor.module#NewCreditorPageModule' },
  { path: 'single-debt', loadChildren: './pages/debts/single-debt/single-debt.module#SingleDebtPageModule' },
  { path: 'new-debt', loadChildren: './pages/debts/new-debt/new-debt.module#NewDebtPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
