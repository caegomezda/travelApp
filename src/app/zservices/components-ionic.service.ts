import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentsIonicService {

  constructor(public alertController: AlertController) { }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss:false,
      header: 'Camilo Gomez',
      mode:'ios',
      message: '<ion-icon name="location"></ion-icon><strong>Calle 60 #45 b-21</strong>',
      buttons: [
        {
          text: 'Rechazar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
