import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FireBaseService } from '../zservices/fire-base.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentialFormSignUp:FormGroup;
  // verificationUsuBDFirebase:any;
  constructor(private fb:FormBuilder,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private firebaseService: FireBaseService,
              private router: Router
  ) { }

  ngOnInit(){
    this.credentialFormSignUp = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      password2:['',[Validators.required,Validators.minLength(6)]],

    });
  }

  async  signUp(){
    // this.verificationUsuBDFirebase = await this.verificationService.verificationUsuBDFirebase;
      const loading = await this.loadingController.create();
      await loading.present();
      this.firebaseService.signUp(this.credentialFormSignUp.value).then( user =>{
        loading.dismiss();
        this.firebaseService.SendVerificationMail();
        // this.router.navigateByUrl('/verification', {replaceUrl: true});

      }, async err =>{
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Registro fallido',
          message: err.message,
          buttons: ['OK'],
        });
        console.log("alert",alert);
        console.log("err",err)
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

}
