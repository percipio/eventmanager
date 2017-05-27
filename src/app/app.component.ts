import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCQ1BxWS731O5IIXbRKtzluB7ETLFDZTKo",
  authDomain: "myeventmanager-41bd2.firebaseapp.com",
  databaseURL: "https://myeventmanager-41bd2.firebaseio.com",
  projectId: "myeventmanager-41bd2",
  storageBucket: "myeventmanager-41bd2.appspot.com",
  messagingSenderId: "230084980652"
})

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  zone: NgZone;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.zone = new NgZone({});

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = 'login';
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
