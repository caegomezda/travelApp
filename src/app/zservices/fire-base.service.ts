import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../aInterfaces/fire-base-interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
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
    });
  }

  async SendVerificationMail() {
    return  (await this.afAuth.currentUser).sendEmailVerification().then(() => {
      console.log('registro exitoso');
    })
  }
}

