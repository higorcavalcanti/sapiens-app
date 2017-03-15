import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";

import {API} from './api';
import {Database} from './database';

@Injectable()
export class Notas {

  private notas: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private api: API, private database: Database) {
    this.offline();
    this.online().catch(() => {
      console.error("Falha ao carregar notas online");
    });
  }

  public getNotas(): Observable<any[]> {
    return this.notas.asObservable();
  }

  public offline() {
    this.database.get('notas').then(
      (data: any) => {
        this.notas.next( JSON.parse(data) );
      },
      (err: any) => {
        console.error('Falha ao carregar notas offline', err);
      }
    );
  }

  public online() {
    return new Promise((resolve, reject) => {
      this.api.request('notas').then(
        (data: any) => {
          console.info('Notas Provider > online', data);

          if (data.hasOwnProperty('logado') && !data.logado) {
            if (data.hasOwnProperty('erro')) reject(data.erro);
            else reject('Erro desconhecido');
          }

          this.notas.next(data);
          this.database.set('notas', JSON.stringify(data));
          resolve(true);
        },
        (err: any) => {
          console.error('Notas Provider > online > err', err);
          reject(err);
        }
      );
    });
  }
}
