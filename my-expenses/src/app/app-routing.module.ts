import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule', canActivate: [AuthGuardService] },
  { path: 'new-creditor', loadChildren: './pages/creditors/new-creditor/new-creditor.module#NewCreditorPageModule', canActivate: [AuthGuardService] },
  { path: 'new-debt', loadChildren: './pages/debts/new-debt/new-debt.module#NewDebtPageModule', canActivate: [AuthGuardService] },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },  { path: 'language-popover', loadChildren: './pages/language-popover/language-popover.module#LanguagePopoverPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
