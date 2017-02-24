import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';

import { Configuracoes } from '../providers/configuracoes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, private configs: Configuracoes) {

    platform.ready().then(() => {

      this.configs.initializePreferences();

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
