import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { AppComponent } from '../app.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { RecipeDetailsComponent } from '../recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  { path : '', redirectTo: '/recipes', pathMatch: 'full'},
  { path : 'recipes', component: RecipesComponent, children : [
    {path: '', component: WelcomeComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailsComponent},
    {path: ':id/edit', component: RecipeEditComponent}
  ]},
  { path : 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class RoutingModule { }
