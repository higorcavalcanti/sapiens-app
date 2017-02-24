import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";

import {API} from './api';
import {Database} from './database';

@Injectable()
export class Notas {

  private notas: BehaviorSubject<number[]> = new BehaviorSubject([]);

  constructor(private api: API, private database: Database) {
    this.notasOffline();
    this.notasOnline();
  }

  public getNotas(): Observable<number[]> {
    return this.notas.asObservable();
  }

  public notasOffline() {
    this.database.get('notas').then(
      (notas: any) => {
        this.notas.next(notas);
      },
      (err: any) => {
        console.log('Falha ao carregar notas offline', err);
      }
    );
  }

  public notasOnline() {
    return new Promise((resolve, reject) => {
      this.api.request('notas').then(
        (data: any) => {
          console.log('NotasProvider > notasOnline', data);

          if (data.hasOwnProperty('logado') && !data.logado) {
            if (data.hasOwnProperty('erro')) reject(data.erro);
            else reject('Erro desconhecido');
          }

          this.notas.next(data);
          this.database.set('notas', JSON.stringify(data));
          resolve(true);
        },
        (err: any) => {
          console.log('NotasProvider > notasOnline > err', err);
          reject(err);
        }
      );
    });
  }
}
