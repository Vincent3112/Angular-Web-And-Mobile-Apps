import {CD} from "../models/CD";
import {Book} from "../models/Book";
import { Injectable } from "@angular/core";
import {Storage} from  '@ionic/storage';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {Subject} from "rxjs";

@Injectable()
export class ArticlesService {

  constructor (private storage: Storage)  {
  }

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

  cdList$ = new Subject<CD[]>();
  bookList$ = new Subject<Book[]>();

  saveCds() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('CD').set(this.cdList).then(
        (data: DataSnapshot) => {
          resolve(data);
        }
      ).catch((error) => {
        reject(error);
      });
    });
  }

  saveBooks() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('Books').set(this.bookList).then(
        (data: DataSnapshot) => {
          resolve(data);
        }
      ).catch((error) => {
        reject(error);
      });
    });
  }

  fetchCds() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('CD').once('value').then(
        (data: DataSnapshot) => {
          this.cdList = data.val();
          this.emitCds();
          resolve('Données récupérées avec succès !');
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    });
  }

  fetchBooks() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('Books').once('value').then(
        (data: DataSnapshot) => {
          this.bookList = data.val();
          this.emitBooks();
          resolve('Données récupérées avec succès !');
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    });
  }

  saveBooksInStorage(){
    this.storage.set('Books', this.bookList);
  }

  saveCdsInStorage(){
    this.storage.set('CD', this.cdList);
  }


  fetchBooksFromStorage(){
    this.storage.get('Books').then(
      (books) => {
        if (books && books.length) {
          this.bookList = books.slice();
        }
        this.emitBooks();
      }
    )
  }

  fetchCdsFromStorage(){
    this.storage.get('CD').then(
      (Cds) => {
        if (Cds && Cds.length) {
          this.cdList = Cds.slice();
        }
        this.emitCds();
      }
    )
  }

  emitBooks(){
    this.bookList$.next(this.bookList);
  }

  emitCds(){
    this.cdList$.next(this.cdList);
  }
}
