import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../aInterfaces/fire-base-interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';


=======
>>>>>>> bb03f4ea53e63bb7716cbeee3249814e54351292

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
    let email = credentialForm.email
    let password = credentialForm.password
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const uid = credential.user.uid;
    return this.afs.doc(
    `user/${uid}`
    ).set({
      uid,
      email:email,
      phone:" ",
      password:password,
      type:"user"
    });
  }

  async SendVerificationMail() {
    return  (await this.afAuth.currentUser).sendEmailVerification().then(() => {
      console.log('registro exitoso');
    })
  }

  async AddNewUser(credential,form){
    let uid = credential.user.uid;
    let accessToken = credential.user._delegate.accessToken
    const apiUrl = `${this.userURL}${uid}.json?auth=${accessToken}`;
    let json = form
    json = JSON.stringify(json);
    return this.http.post(`${apiUrl}`, json, this.httpOptions).pipe(map( data => data)).toPromise();
  }

  async AddNewDriver(credential,form){
    let uid = credential.user.uid;
    let accessToken = credential.user._delegate.accessToken
    const apiUrl = `${this.driverURL}${uid}.json?auth=${accessToken}`;
    let json = form
    json = JSON.stringify(json);
    return this.http.post(`${apiUrl}`, json, this.httpOptions).pipe(map( data => data)).toPromise();
  }

  async AddNewMovement(credential,form){
    let uid = credential.user.uid;
    let accessToken = credential.user._delegate.accessToken
    const apiUrl = `${this.movementURL}${uid}.json?auth=${accessToken}`;
    let json = form
    json = JSON.stringify(json);
    return this.http.post(`${apiUrl}`, json, this.httpOptions).pipe(map( data => data)).toPromise();
  }
  
}

