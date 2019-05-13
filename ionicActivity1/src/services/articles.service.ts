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


  booksAvailable(){
    let books = 0;
    for(let book of this.bookList){
      if (!book.isLent){
        books++;
      }
    }
    return books;
  }

  cdsAvailable(){
    let cds = 0;
    for(let cd of this.cdList){
      if (!cd.isLent){
        cds++;
      }
    }
    return cds;
  }

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

  emitBooks(){
    this.bookList$.next(this.bookList);
  }

  emitCds(){
    this.cdList$.next(this.cdList);
  }

  addBook(book: Book){
    this.bookList.push(book);
    this.saveBooks();
  }

  addCd(cd: CD){
    this.cdList.push(cd);
    this.saveCds();
  }

  deleteCd(index: number){
    this.cdList.splice(index, 1);
    this.saveCds();
    this.fetchCds();
    console.log("12");
  }

  deleteBook(index: number){
    this.bookList.splice(index, 1);
    this.bookList = this.bookList.slice();
  }
}
