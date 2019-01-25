import {Appareil} from "../models/Appareil";
import {Subject} from "rxjs";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;


export class AppareilsService {


  appareils$ = new Subject<Appareil[]>();

  appareilsList: Appareil[] = [
    {
      name: 'Machine à laver',
      description: [
        'Volume: 6 litres',
        'Temps de lavage',
        'Consommation: 173 kWh/an'
      ],
      isOn: true,
      startTime: '',
      endTime: ''
    },
    {
      name: 'Télévision',
      description: [
        'Dimension: 40 pouces',
        'Conso : 12 Wh'
      ],
      isOn: true,
      startTime: '',
      endTime: ''
    },
    {
      name: 'Ordinateur',
      description: [
        'Prix: 12 000 euros'
      ],
      isOn: false,
      startTime: '',
      endTime: ''
    }
  ];

  addAppareil(appareil: Appareil) {
    this.appareilsList.push(appareil);
    this.emitAppareil();
  }

  emitAppareil(){
    this.appareils$.next(this.appareilsList.slice());
  }


  saveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('appareils').set(this.appareilsList).then(
        (data: DataSnapshot) => {
          resolve(data);
        }
      ).catch((error) => {
        reject(error);
      });
    });
  }

  retrieveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('appareils').once('value').then(
        (data: DataSnapshot) => {
          this.appareilsList = data.val();
          this.emitAppareil();
          resolve('Données récupérées avec succès !');
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    });
  }

}
