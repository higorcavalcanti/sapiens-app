import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoadingPage } from '../pages/loading/loading';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any

  constructor(platform: Platform) {

    platform.ready().then(() => {

      this.rootPage = LoadingPage;
      StatusBar.styleDefault();
    });
  }
}
