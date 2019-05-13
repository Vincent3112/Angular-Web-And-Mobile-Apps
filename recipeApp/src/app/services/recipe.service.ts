import { Injectable } from '@angular/core';
import { Recipes } from '../models/recipes';
import { Ingredients } from '../models/ingredients';
import { Subject } from 'rxjs';
import {ShoppingListService} from './shopping-list.service';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipes[]>();

  constructor(private shoppingListService : ShoppingListService) { }

  private recipes: Recipes[] = [
    new Recipes('Tagliatelle mit krautern',
      'Tagliatelle al dente aux herbes',
      '../../../assets/images/pasta.webp',
      [
        new Ingredients('Pâtes', 1),
        new Ingredients('Herbes', 1)
      ]),
    new Recipes('Meatballs und Nudeln',
      'Boulettes de viandes aux pâtes Thaï',
      '../../../assets/images/meatballs.jpg',
      [
        new Ingredients('Boulettes', 6),
        new Ingredients('Pâtes', 100)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipes) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipes) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredients) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
