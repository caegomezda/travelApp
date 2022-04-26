import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  correoUsuario:any;

  constructor() { }

  getUsu(correo){
    this.correoUsuario = correo;
  }

  sendUsu(){
    let result = this.correoUsuario;
    return result;
  }

    //Crea aleatoriamente cuentas para nuevos usuarios

}
