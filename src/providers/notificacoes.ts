import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Platform} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';

import {Configuracoes} from './configuracoes';

@Injectable()
export class Notificacoes {

  constructor(private platform: Platform, private configs: Configuracoes) {
    /*
     LocalNotifications.on("click", (notification, state) => {
     console.log('Notificacao clicada', notification, state);
     this.onNotificationClick(notification, state);
     });
     */
  }

  onNotificationClick(notification, state) {
    /*
     this.alert.create({
     title: "Notificação clicada",
     subTitle: "Notificação do cardapio, horario: " + notification.data,
     buttons: ["Fechar"]
     }).present();
     */
  }

  clearAll() {
    return Promise.all([
      LocalNotifications.clearAll(),
      LocalNotifications.cancelAll()
    ]);
  }

  horarios(horarios) {

    this.clearAll().then(() => {

      let configs = this.configs.getConfigs();

      if (!configs.notificacoes.aula.ativo) {
        return 0;
      }

      console.log("Notificacoes horarios", horarios);

      horarios.forEach((item) => {
        let notifications = [];
        let hoje = new Date();

        notifications.push({aula: item.segunda, dia: 1});
        notifications.push({aula: item.terca, dia: 2});
        notifications.push({aula: item.quarta, dia: 3});
        notifications.push({aula: item.quinta, dia: 4});
        notifications.push({aula: item.sexta, dia: 5});
        notifications.push({aula: item.sabado, dia: 6});

        notifications.forEach((dia) => {

          if (dia.aula.codigo.length == 0 || dia.aula.sala.length == 0) {
            return;
          }

          console.log(item.hora, dia.aula.codigo, dia.aula.sala, dia.dia);

          let diferenca = (hoje.getDay() - dia.dia);
          let d = new Date();
          if (dia.dia <= hoje.getDay()) {
            d.setDate(d.getDate() + 7 - diferenca);
          }
          else {
            d.setDate(d.getDate() - diferenca);
          }


          let horaSplit = item.hora.split(':');

          d.setHours(horaSplit[0]);
          d.setMinutes(horaSplit[1] - configs.notificacoes.aula.tempo);
          d.setSeconds(0);

          if (d.getDate() == hoje.getDate() && d <= hoje) d.setDate(d.getDate() + 7);

          LocalNotifications.schedule({
            id: Math.floor((Math.random() * Number.MAX_SAFE_INTEGER) + 1),
            title: 'Horário da Aula ' + dia.aula.codigo,
            text: 'Sala: ' + dia.aula.sala,
            at: d,
            every: 'week'
          });
        });
      });

      console.log(LocalNotifications.getAll());
    });
    //Calcular o dia da semana (hoje e dos horarios)
    //Se menor, adiciona 7 e tira a diferenca (hoje - menor)
    //Se maior, adiciona a diferenca
  }

  /*
   private diaSemana(dia: string) {
   if (dia == "domingo") return 0;
   if (dia == "segunda") return 1;
   if (dia == "terca") return 2;
   if (dia == "quarta") return 3;
   if (dia == "quinta") return 4;
   if (dia == "sexta") return 5;
   if (dia == "sabado") return 6;
   }
   */

}

