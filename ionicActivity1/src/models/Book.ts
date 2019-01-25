export class Book {

  isLent: boolean;

  constructor(public name: string, public auteur: string, public prix: number){
    this.isLent = false;
  }
}
