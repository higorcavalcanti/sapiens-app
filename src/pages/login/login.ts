import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';

import {Sapiens} from '../../providers/sapiens';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private login: {
    user?: string,
    pass?: string
  } = {user: 'ER03621', pass: '0410'};

  constructor(private navCtrl: NavController, private sapiens: Sapiens,
              private loadingCtrl: LoadingController, private alertCtrl: AlertController,) {

  }

  logar() {

    let loading = this.loadingCtrl.create({content: 'Logando...'});
    loading.present();
    let timeout = setTimeout(() => {
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Falha no login',
        subTitle: 'Sem comunicação com o servidor!',
        buttons: ['Fechar']
      }).present();
    }, 20000);

    this.sapiens.login(this.login.user, this.login.pass).then(
      (sucess) => {
        loading.dismiss();
        clearTimeout(timeout);
        this.navCtrl.setRoot(TabsPage);
      },
      err => {
        this.alertCtrl.create({
          title: 'Falha no login',
          subTitle: err,
          buttons: ['Fechar']
        }).present();
      }
    );
  }

}
