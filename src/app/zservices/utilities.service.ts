import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  idUser:any;
  token:any;
  item:any;
  correoUsuario:any;

  constructor() { }

  getUsu(correo){
    this.correoUsuario = correo;
  }

  sendUsu(){
    let result = this.correoUsuario;
    return result;
  }

  saveIdUser(id){
    this.idUser = id;
  }
  //Obtiene la del usuario activo
  getIdUser(){
    return this.idUser;
  }

  saveTokenUser(token){
    this.token = token;
  }

  getToken(){
    return this.token;
  }

  getDataUser(){
    return this.getDataUser;
  }

  saveDataUser(data){
    this.getDataUser = data;
  }

}
