import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Store } from '../interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userStore: any = [];

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  signIn = (data: any) => {
    return this.afAuth.signInWithEmailAndPassword(data.email, data.password)
      .then(() => this.ngZone.run(() => this.router.navigate(['pages', 'home'])))
      .catch((error) => window.alert(error.message))
  }

  // Sign up with email/password
  signUp = (data: any) => {
    return this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
    .then(({ user }) => {
      data.uid = user.uid;
      this.setUserStore(data)
    })
    .catch((error) => window.alert(error.message))
  }

  setUserStore = (user: any) => {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`store/${user.uid}`);
    const userStore: Store = {
      uid: user.uid,
      email: user.email,
      nit: user.nit,
      name: user.name,
      city: user.city,
      logo: user.logo,
      phone: user.phone,
      street: user.street,
      number: user.number,
      neighboord: user.neighboord,
      description: user.description
    }
    return userRef.set(userStore, { merge: true })
  }
}
