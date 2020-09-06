import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: number;
  @Input() enFavoritos;

  constructor( private iab: InAppBrowser,
               private actionSheet: ActionSheetController,
               private socialSharing: SocialSharing,
               private dataLocal: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia(){
    console.log(this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    let favoritoBtn;

    if (this.enFavoritos) {
      favoritoBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocal.borrarNoticia(this.noticia);
        }
      };
    }else
    {
      favoritoBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('favorite clicked');

          this.dataLocal.guardarNoticia(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheet.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      favoritoBtn
      , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
