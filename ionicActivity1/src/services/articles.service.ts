import {CD} from "../models/CD";
import {Book} from "../models/Book";

export class ArticlesService {

  cdList: CD[] = [
    {
      name: 'I will survive',
      artiste: 'Gloria Gaynor',
      prix: 15,
      isLent: false,
      loueur: ''
    },
    {
      name: 'Shadow of the day',
      artiste: 'Linkin Park',
      prix: 15,
      isLent: false,
      loueur: ''
    },
    {
      name: 'The man with the red face',
      artiste: 'Laurent Garnier',
      prix: 15,
      isLent: true,
      loueur: 'Bertrand'
    },
    {
      name: 'In Between',
      artiste: 'Linkin Park',
      prix: 15,
      isLent: false,
      loueur: ''
    },
    {
      name: 'Petit frère',
      artiste: 'Iam',
      prix: 15,
      isLent: true,
      loueur: 'Arnaud'
    }
  ]

  bookList: Book[] = [
    {
      name: 'Réparer les vivants',
      auteur: 'Maylis de Kerangal',
      prix: 12,
      isLent: true,
      loueur: 'Arthur'
    },
    {
      name: 'Serotonine',
      auteur: 'Michel Houellebecq',
      prix: 15,
      isLent: true,
      loueur: 'Yves'
    },
    {
      name: "La gouteuse d'Hitler",
      auteur: 'Rosella Postorino',
      prix: 15,
      isLent: false,
      loueur: ''
    },
    {
      name: "L'erreur",
      auteur: 'Susie Fox',
      prix: 15,
      isLent: true,
      loueur: 'Gilbert'
    }
  ]
}
