import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentsIonicService {

  constructor(public alertController: AlertController,
              private router: Router,
    ) { }

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
            this.router.navigateByUrl('/driver-map', {replaceUrl: true});
          }
        }
      ]
    });

    await alert.present();
  }
}
