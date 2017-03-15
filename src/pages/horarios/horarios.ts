import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Horarios } from '../../providers/horarios';

@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html'
})
export class HorariosPage {

  private horarios: any;
  private disciplinas: any;

  constructor(public navCtrl: NavController, private horariosProvider: Horarios, private alertCtrl: AlertController) {
    this.horarios = this.horariosProvider.getHorarios();
    this.disciplinas = this.horariosProvider.getDisciplinas();
  }

  doRefresh(refresher) {
    this.horariosProvider.online().then(
      sucess => {
        refresher.complete();
      },
      err => {
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
