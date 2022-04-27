import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../aInterfaces/fire-base-interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { UtilitiesService } from './utilities.service';

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
              private http:HttpClient,
              private utilities : UtilitiesService
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
    // return
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
    let uid = credential.user.uid;
    let url = await this.getUrlType(urlType)
    let accessToken = await credential.user._delegate.accessToken;
    const apiUrl = `${url}${uid}.json?auth=${accessToken}`;
    console.log('apiUrl',apiUrl);
    let json = form
    json = JSON.stringify(json);
    return await this.http.post(`${apiUrl}`, json, this.httpOptions).pipe(map( data => data)).toPromise();
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

  //https://travel-app-v1-e684f-default-rtdb.firebaseio.com/user-api/-N0Z_TuTS4A965V-SJCz

  async fetchUserInfo2Api(credential,urlType){
    let url = await this.getUrlType(urlType)
    let uid = credential["uid"];
    let accessToken = credential["token"]
    const apiUrl = `${url}${uid}.json?auth=${accessToken}`;
    console.log('apiUrl',apiUrl);
    let json = {}
    json = JSON.stringify(json);
    return this.http.get(`${apiUrl}`, json).pipe(map( data => data)).toPromise();
  }

  async getAccountData(){
    let credential = {
      uid:  await this.utilities.getIdUser(),
      token:  await this.utilities.getToken()
    }
    console.log('credential',credential);
    let result  = await this.fetchUserInfo2Api(credential,1);
    let data = await this.getData(result)
    console.log('data',data);
    return data
  }

  async getData(dataJson){
    let data = [];
    for (let key in dataJson) {
      data = dataJson[key] 
    }
    this.utilities.saveDataUser(data);
  }
  
}