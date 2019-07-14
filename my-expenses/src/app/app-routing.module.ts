import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'new-creditor', loadChildren: './pages/creditors/new-creditor/new-creditor.module#NewCreditorPageModule' },
  { path: 'new-debt', loadChildren: './pages/debts/new-debt/new-debt.module#NewDebtPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
