import { Component, ViewChild } from '@angular/core';
import { IonSegment} from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild(IonSegment, { static: false }) segment: IonSegment;

  categorias = [
    'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology',
  ];

  noticias: Article[] = [];
  disableScroll = false;

  constructor(private NoticiasService: NoticiasService) {}


  // ngOnInit(){
  //   this.segment.value = this.categorias[0];
  // }

  ionViewDidEnter() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(event) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?){
    this.NoticiasService.getTopHeadlineCategory(categoria).subscribe(resp => {
      this.noticias.push(...resp.articles);

      if (resp.articles.length === 0) {
        this.disableScroll = true;
      }
      else
      {
        this.disableScroll = false;
      }

      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event){
    this.cargarNoticias(this.segment.value, event);
  }

}
