import { Injectable } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { API } from '../app.api'
import { User } from 'src/app/shared/model/user';

@Injectable()
export class UserService {

  private sUrl: String = '';
  lUser: Array<User>;
  lUserFiltred: Array<User>;

  private oOptions = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  });

  private oOptionsJson = new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json;charset=UTF-8'
    })
  });

  constructor(private http: Http) {
    this.lUser = new Array<User>();
    this.lUserFiltred = new Array<User>();
  }

  getUsers() {
    const usuarios:any = this.http.get(`${API}/users`)
      .pipe(
        map(res => {
          const lista = res.json();
          /*
          lista.forEach(element => {
            const params = new URLSearchParams();
            params.set('userId', '' + element.id);
            const requests = [
              this.http.get(`${API}/posts`, this.oOptions.merge({ search: params })).pipe(
                map(res => {
                  return res.json();
                })),
              this.http.get(`${API}/albums`, this.oOptions.merge({ search: params })).pipe(
                map(res => {
                  return res.json();
                }))
            ];
            forkJoin(requests).subscribe(res => { 
              element.oPosts =  res[0];            
              element.oAlbums =  res[1];
              }
            );
          });
          */
          return lista;
        }));
    return usuarios;
  }

  getPostsAndAlbuns(id: number) {
    const params = new URLSearchParams();
    params.set('userId', id.toString());
    return forkJoin(
      this.http.get(`${API}/posts`, this.oOptions.merge({ search: params })),
      this.http.get(`${API}/albums`, this.oOptions.merge({ search: params })),
      this.http.get(`${API}/photos`)
    );
}

  getPhotos(id: number): Observable<any> {
    const params = new URLSearchParams();
    params.set('albumId', id.toString());
    return this.http.get(`${API}/photos`, this.oOptions.merge({ search: params }))
      .pipe(
        map(res => {
          return res.json();
        }));
  }
}
