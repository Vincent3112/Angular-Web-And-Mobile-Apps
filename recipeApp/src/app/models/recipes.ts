import { Ingredients } from './ingredients';

export class Recipes {

    constructor(public name: string,public description: string,public imagePath: string, public ingredients: Ingredients[]){
    }
}