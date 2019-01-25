import {CD} from "../models/CD";
import {Book} from "../models/Book";

export class ArticlesService {

  cdList: CD[] = [
    {
      name: 'I will survive',
      artiste: 'Gloria Gaynor',
      prix: 15,
      isLent: false
    },
    {
      name: 'Second CD',
      artiste: 'second artiste',
      prix: 15,
      isLent: false
    }
  ]

  bookList: Book[] = [
    {
      name: 'Réparer les vivants',
      auteur: 'Maylis de Kerangal',
      prix: 12,
      isLent: true
    },
    {
      name: 'Second livre',
      auteur: 'second auteur',
      prix: 15,
      isLent: false
    }
  ]
}
