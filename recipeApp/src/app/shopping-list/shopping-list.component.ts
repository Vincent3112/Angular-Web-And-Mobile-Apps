import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../models/ingredients';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{


  ingredients: Ingredients[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
