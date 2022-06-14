import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/zservices/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  infoUsuario
  constructor(private router : Router,
              private utilities : UtilitiesService,
              ) { }

  sesionCaller(){
   this.callInfoUsuario();
  }
  
  sesion(){
    if (this.infoUsuario === undefined) {
      return false;
    }else{
      return true;
    }
  }

  async sesionVerificator(){
    let result = await this.sesion();
    if (!result) {
      this.router.navigate(['/login']);
    }
  }

  async callInfoUsuario(){
    let result = await this.utilities.sendUsu();
    // console.log('result',result);
    this.infoUsuario = result
    this.sesionVerificator()
    // return result;
  }
}
