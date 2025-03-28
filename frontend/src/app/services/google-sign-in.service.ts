// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// declare const gapi: any;

// @Injectable({
//   providedIn: 'root'
// })
// export class GoogleSigninService {
//   private auth2: any;
//   private userSubject = new BehaviorSubject<any>(null);
//   user$ = this.userSubject.asObservable();

//   constructor() {
//     this.initGoogleAuth();
//   }

//   private initGoogleAuth(): void {
//     gapi.load('auth2', () => {
//       this.auth2 = gapi.auth2.init({
//         client_id: '267275564598-nmpit5croecbv2a36r0p1g1f04m56e8t.apps.googleusercontent.com', 
//         scope: 'yashilbusa333@gmail.com'
//       });
//     });
//   }

//   signIn(): void {
//     this.auth2.signIn().then((googleUser: any) => {
//       const profile = googleUser.getBasicProfile();
//       const userData = {
//         id: profile.getId(),
//         name: profile.getName(),
//         email: profile.getEmail(),
//         imageUrl: profile.getImageUrl(),
//         token: googleUser.getAuthResponse().id_token
//       };
//       this.userSubject.next(userData);
//     }).catch((error: any) => {
//       console.error('Sign-in error:', error);
//     });
//   }

//   signOut(): void {
//     this.auth2.signOut().then(() => {
//       this.userSubject.next(null);
//     });
//   }

//   getCurrentUser() {
//     return this.userSubject.value;
//   }
// }