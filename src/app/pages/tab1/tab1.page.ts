import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];
  disableScroll = false;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(event){
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadLines().subscribe( resp => {
      this.noticias.push(...resp.articles);

      if (resp.articles.length === 0) {
        this.disableScroll = true;
      }
      
      if (event) {
        event.target.complete();
      }
    });
  }

}