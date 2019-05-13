import { Component, OnInit, Input } from '@angular/core';
import { Recipes } from 'src/app/models/recipes';
import { INSPECT_MAX_BYTES } from 'buffer';

@Component({
  selector: 'app-recipe-items',
  templateUrl: './recipe-items.component.html',
  styleUrls: ['./recipe-items.component.css']
})
export class RecipeItemsComponent implements OnInit {

  @Input() recipe: Recipes;
  @Input() index: number;
  
  constructor() { }

  ngOnInit() {
  }
}
