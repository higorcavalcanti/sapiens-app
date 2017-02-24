import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {Platform} from 'ionic-angular';
import {NativeStorage} from 'ionic-native';

@Injectable()
export class Database {

  constructor(private platform: Platform) {

  }

  public set(key, value) {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        NativeStorage.setItem(key, value).then(
          (data: any) => {
            console.log('Database > set', key);
            resolve(data);
          },
          (err: any) => {
            console.log('Database > set error', key, err);
            //reject(err);
          }
        );
      });
    });
  }

  public get(key) {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        NativeStorage.getItem(key).then(
          (data: any) => {
            console.log('Database > get', key);
            resolve(data);
          },
          (err: any) => {
            console.log('Database > get error', key, err);
            reject(err);
          }
        );
      });
    });
  }
}
