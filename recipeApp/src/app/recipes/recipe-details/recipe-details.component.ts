import { Component, OnInit } from '@angular/core';
import { Recipes } from 'src/app/models/recipes';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  loadedRecipe: Recipes;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.loadedRecipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onLoad(recipe: Recipes){
    this.loadedRecipe = recipe;
  }


  toShoppingList(){
    let ingredientsToAdd = this.loadedRecipe.ingredients;
    ingredientsToAdd.forEach(element => {
      this.recipeService.addIngredientsToShoppingList(element);
    });
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }


}
