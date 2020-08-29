import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHealines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinePage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    query = apiURL + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines(){
    this.headlinePage++;
    // tslint:disable-next-line: comment-format
    //return this.http.get<RespuestaTopHealines>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=1aec466e97654d1b975c650aef9bde64`);
    return this.ejecutarQuery<RespuestaTopHealines>(`/top-headlines?country=us&page=${this.headlinePage}`);
  }

  getTopHeadlineCategory(category: string){
    // tslint:disable-next-line: max-line-length
    // return this.http.get<RespuestaTopHealines>(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1aec466e97654d1b975c650aef9bde64`);

    if (this.categoriaActual === category) {
      this.categoriaPage++;
    }
    else
    {
      this.categoriaActual = category;
      this.categoriaPage = 0;
    }

    return this.ejecutarQuery<RespuestaTopHealines>(`/top-headlines?country=us&category=${category}&page=${this.categoriaPage}`);
  }


}
