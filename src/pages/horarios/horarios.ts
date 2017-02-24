import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Horarios } from '../../providers/horarios';

@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html'
})
export class HorariosPage {

  private horarios: any;

  constructor(public navCtrl: NavController, private horariosProvider: Horarios, private alertCtrl: AlertController) {
    this.horarios = this.horariosProvider.getHorarios().subscribe((h) => {
      console.log('Horarios alterados', h);
    });
  }

  doRefresh(refresher) {
    this.horariosProvider.online().then(
      sucess => {
        console.log('HorariosPage > refresh', sucess);
        refresher.complete();
      },
      err => {
        console.log('HorariosPage > refresh > err', err);
        refresher.cancel();
        this.alertCtrl.create({
          title: 'Falha ao carregar',
          subTitle: err,
          buttons: ['Fechar']
        }).present();
      }
    );
  }
}
