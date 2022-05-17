import { Injectable } from '@angular/core';
import { LoginPage } from '../app/login/login.page';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  idUser:any;
  token:any;
  item:any;
  correoUsuario:any;
  dataUser:any;

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

  async getDataUser(){
    console.log('this.dataUser',this.dataUser);
    return await this.dataUser;
  }

  async saveDataUser(data){
    this.dataUser = await data;
  }

}
