import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../aInterfaces/fire-base-interface';


import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  currentUser: User = null;
  constructor(
    private afAuth: AngularFireAuth,
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

}

