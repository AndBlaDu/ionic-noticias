import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
              public toastController: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  guardarNoticia(noticia: Article){

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if (!existe) {
      // Con unshif se pone el elemento al inicio del arreglo
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Agregado a favoritos');
    }else {
      this.presentToast('La noticia ya se encuentra en favoritos');
    }

  }

  async cargarFavoritos(){

    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }

  }

  async borrarNoticia(noticia: Article){
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    await this.storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos');
  }
}
