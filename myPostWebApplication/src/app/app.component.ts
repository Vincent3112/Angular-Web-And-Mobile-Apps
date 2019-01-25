import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'posts';

  constructor(){
    var config = {
      apiKey: "AIzaSyAdc7LjYR0ZxhEXFLsc1ZwSV6AoJlkUafY",
      authDomain: "finalangularactivity.firebaseapp.com",
      databaseURL: "https://finalangularactivity.firebaseio.com",
      projectId: "finalangularactivity",
      storageBucket: "",
      messagingSenderId: "383812245539"
    };
    firebase.initializeApp(config);
  }
}
