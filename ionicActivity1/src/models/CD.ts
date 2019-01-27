export class CD {

  isLent: boolean;

constructor(public name: string, public artiste: string, public prix: number, public loueur: string){
  this.isLent = false;
}
}
