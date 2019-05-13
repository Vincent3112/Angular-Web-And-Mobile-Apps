import { Injectable } from '@angular/core';
import { Ingredients } from '../models/ingredients';
import { Subject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredients[]>();

  startedEditing = new Subject<number>();

  constructor() { }

  ingredients: Ingredients[] = [
    new Ingredients('Apples', 5),
    new Ingredients('Bananas', 12)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredients(ingredient: Ingredients){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredients){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
