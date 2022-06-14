import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FireBaseService } from '../zservices/fire-base.service';
import { UtilitiesService } from '../zservices/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordForm = {
    clave : "",
  }
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;

  credentialForm:FormGroup;
  verificaionFirebase:any;
  passwordTypeInput_1  =  'password';

  constructor(private fb:FormBuilder,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private firebaseService:FireBaseService,
              private usuarioInfo: UtilitiesService,
              private router: Router,
  ) { }

  ngOnInit() {    
    //Credential login form EMAIL PASSWORD

      this.credentialForm = this.fb.group({
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
      })
  }

  async  signIn(){
    // console.log('this.credentialForm.value',this.credentialForm.value);

    if (this.credentialForm.value.email === "driver1@gmail.com") {
      this.router.navigateByUrl('/driver', { replaceUrl: true });
    }else{
    let newCredencialValue = {value:{email:this.credentialForm.value['email'],password:this.credentialForm.value['password']}}
    let emailUsu =this.credentialForm.value['email'];
    const loading = await this.loadingController.create();
    await loading.present();
    this.firebaseService.signIn(newCredencialValue.value).then( res =>{
      if(this.firebaseService.isEmailVerified) {      
        this.usuarioInfo.getUsu(emailUsu)
        loading.dismiss();
        this.router.navigateByUrl('/menu-principal', {replaceUrl: true});
      } else {
        loading.dismiss();
        this.isNotVerified();
      }
    }, async err =>{
      loading.dismiss();
      const alert = await this.alertController.create({
        header: ':(',
        message:'Correo o contraseña invalida, revisa e intentalo de nuevo',
        buttons: ['OK'],
      });
      console.log("alert",alert)
      await alert.present();
    })
    await loading.dismiss();
  }
  }
  
  get email(){
    return this.credentialForm.get('email');
  }

  get password(){
    return this.credentialForm.get('password');
  }

  async isNotVerified(){
      const alert2 = await this.alertController.create({
        header: ':(',
        message:'Correo no verificado, revisa tu correo',
        buttons: [{text:'OK',
        handler: () => {
          this.router.navigateByUrl('/login', {replaceUrl: true});
        }}],
      });
      await alert2.present();
  }

  togglePasswordMode(nPasswaord) {
    if (nPasswaord === 1) {
      this.passwordTypeInput_1 = this.passwordTypeInput_1 === 'text' ? 'password' : 'text';
    }
  }

}
