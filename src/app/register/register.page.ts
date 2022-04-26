import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isReactNative } from '@firebase/util';
import { AlertController, LoadingController } from '@ionic/angular';
import { FireBaseService } from '../zservices/fire-base.service';
import { UtilitiesService } from '../zservices/utilities.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialFormSignUp:FormGroup;
  passwordForm = {
    primeraClave : "",
    segundaClave: "",
  }
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;

  passwordTypeInput_1  =  'password';
  passwordTypeInput_2  =  'password';
  iconpassword  =  'eye-off';

  constructor(private fb:FormBuilder,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private firebaseService: FireBaseService,
              private router: Router,
              private afAuth: AngularFireAuth,
  ) { }

  ngOnInit(){
    this.credentialFormSignUp = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      password2:['',[Validators.required,Validators.minLength(6)]],

    });
  }



  async  signUp(){
      const loading = await this.loadingController.create();
      await loading.present();
      this.firebaseService.signUp(this.credentialFormSignUp.value).then( user =>{
        loading.dismiss();
        this.firebaseService.SendVerificationMail();
        this.router.navigateByUrl('/validate', {replaceUrl: true});

      }, async err =>{
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Registro fallido',
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();
      })
  }
  
  get email(){
    return this.credentialFormSignUp.get('email');
  }

  get password(){
    return this.credentialFormSignUp.get('password');
  }

  get password2(){
    return this.credentialFormSignUp.get('password');
  }

  async rPassword(){
    if (this.passwordForm['primeraClave'] == '' ||this.passwordForm['segundoClave'] =='' ) {
      this.alertMeController('isEmpty');

    }else{
      if (this.passwordForm['primeraClave']!==this.passwordForm['segundoClave']) {
          this.alertMeController('reject_Comparador');
      }else{
        this.alertMeController('reject_diasDisp');
      }
    }
  }
  
  async alertMeController(estado){
    if(estado ==="isEmpty"){
      const alert = await this.alertController.create({
        header:'Campos Vacios',
        subHeader: 'Existen campos vacios por favor verifique',
        message: '',
        buttons: ['Cerrar']
      });
      await alert.present();
    }else if (estado === "reject_diasDisp") {
      const alert = await this.alertController.create({
        header:'ERROR',
        subHeader: 'Contraseña no valida',
        message: 'Digite de nuevo la contraseña anterior',
        buttons: ['Cerrar']
      });
      await alert.present();
    }else if(estado === "reject_Comparador"){
      const alert = await this.alertController.create({
        header:'ERROR',
        subHeader: 'No concuerdan las contraseñas',
        message: 'Verifique y vuelva a digitar la nueva contraseña',
        buttons: ['Cerrar']
     });
      await alert.present();
    }else if(estado ==="succes"){
      const alert = await this.alertController.create({
        header:'Contraseña actualizada',
        message: '',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/menu']);
            }
          }
        ]
      });
      await alert.present();
    } 
  }

  togglePasswordMode(nPasswaord) {
    if (nPasswaord === 1) {
      this.passwordTypeInput_1 = this.passwordTypeInput_1 === 'text' ? 'password' : 'text';
    }else if (nPasswaord === 2) {
      this.passwordTypeInput_2 = this.passwordTypeInput_2 === 'text' ? 'password' : 'text';
    }
  }
  

}
