import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeItemsComponent } from './recipes/recipe-list/recipe-items/recipe-items.component';
import { DropdownDirective } from './dropdown.directive';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { RoutingModule } from './routing/routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemsComponent,
    DropdownDirective,
    WelcomeComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
