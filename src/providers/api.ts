import {Injectable} from '@angular/core';
import {Http, Request, RequestOptions, RequestMethod, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

@Injectable()
export class API {

  private API_URL: string = "http://danielaraujos.com/webservicesapiens/index.php?info=";
  //private API_URL: string = "http://localhost/sapiens/index.php?info=";
  private body: string;

  constructor(public http: Http) {
  }

  public request(url: string, body?: any) {

    if(body) {
      this.body = body;
    }

    let headers = new Headers();
    headers.append("Content-Type", 'application/json');

    let requestoptions = new RequestOptions({
      method: RequestMethod.Post,
      url: this.API_URL + url,
      headers: headers,
      body: JSON.stringify( this.body ),
    });

    return new Promise((resolve, reject) => {
      this.http.request(new Request(requestoptions))
        .timeout(2000)
        .map(res => res.json())
        .subscribe(
          data => {
            console.info("HTTP Sucesso", url, data, body);
            resolve(data);
          },
          err => {
            console.error("HTTP Erro", url, err, body);
            reject(err);
          }
        );
    });
  }

  public setBody(body) {
    this.body = body;
  }
}
