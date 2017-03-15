import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";

import {API} from './api';
import {Database} from './database';
import {Notificacoes} from './notificacoes';

@Injectable()
export class Horarios {

  private horarios: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private disciplinas: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private api: API, private database: Database, private notificacoes: Notificacoes) {
    this.offline();
    this.online();
  }

  public getHorarios(): Observable<any[]> {
    return this.horarios.asObservable();
  }

  public getDisciplinas(): Observable<any[]> {
    return this.disciplinas.asObservable();
  }

  public offline() {
    this.database.get('horarios').then(
      (data: any) => {
        let parse = JSON.parse(data);
        this.horarios.next(parse.horarios);
        this.disciplinas.next(parse.disciplinas);
      },
      (err: any) => {
        console.log('Falha ao carregar horarios offline', err);
      }
    );
  }

  public online() {
    return new Promise((resolve, reject) => {
      this.api.request('horarios').then(
        (data: any) => {
          console.log('Horarios Provider > online', data);

          if (data.hasOwnProperty('logado') && !data.logado) {
            if (data.hasOwnProperty('erro')) reject(data.erro);
            else reject('Erro desconhecido');
          }

          this.horarios.next(data.horarios);
          this.disciplinas.next(data.disciplinas);

          this.notificacoes.horarios( data.horarios );

          this.database.set('horarios', JSON.stringify(data));
          resolve(true);
        },
        (err: any) => {
          console.log('Horarios Provider > online > err', err);
          reject(err);
        }
      );
    });
  }
}
