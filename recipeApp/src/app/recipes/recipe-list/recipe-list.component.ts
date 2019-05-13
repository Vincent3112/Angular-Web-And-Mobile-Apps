import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipes } from 'src/app/models/recipes';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipes>();

  subscription : Subscription;

  recipes: Recipes[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipes[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
