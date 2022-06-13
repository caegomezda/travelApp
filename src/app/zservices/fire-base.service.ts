import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../aInterfaces/fire-base-interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  private userURL = environment.urlConfing.USERURL;
  private driverURL = environment.urlConfing.DRIVERTURL;
  private movementURL = environment.urlConfing.MOVEMENTURL;
  private  httpOptions:any= { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) };

  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private http:HttpClient
  ) { 
    this.afAuth.onAuthStateChanged((user:any )=> {
      this.currentUser = user;
    })
  }

  signIn({email, password}){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  get isEmailVerified() :boolean {
    return (this.currentUser.emailVerified !== false) ? true : false;
  }

  async signUp(credentialForm){
    let email = credentialForm.email;
    let password = credentialForm.password;
    await this.userCreationRealTimeData({email,password});
    return
  }

  async userCreationRealTimeData({ email, password }): Promise<any>{
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    let creationTime = credential.user.metadata.creationTime;
    let uid = credential.user.uid;
    let newForm = {
        email: email,
        name:"",
        creationDate:creationTime,
        uid:uid,
        isActive:true,
        phone:"",
        userType:"user"
    }
    this.afs.doc(
      `user/${uid}`
      ).set({
        email: email,
        name:"",
        creationDate:creationTime,
        password: password,
        uid:uid,
      });
    await this.AddInstance(credential,newForm,1);
  }

  async SendVerificationMail() {
    return  (await this.afAuth.currentUser).sendEmailVerification().then(() => {
      console.log('registro exitoso');
    })
  }

  async AddInstance(credential,form,urlType){
    // let uid = credential.user.uid;
    let url = await this.getUrlType(urlType)
    let accessToken = credential.user._delegate.accessToken;
    const apiUrl = `${url}.json?auth=${accessToken}`;
    let json = form
    json = JSON.stringify(json);
    return this.http.post(`${apiUrl}`, json, this.httpOptions).pipe(map( data => data)).toPromise();
  }

  getUrlType(urlType){
    switch (urlType) {
      case 1:
        return this.userURL;
      case 2:
        return this.driverURL;
      case 3:
        return this.movementURL;
      default:
        break;
    }
  }
  
}

