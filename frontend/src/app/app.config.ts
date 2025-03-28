import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
// import { GoogleSigninService } from './services/google-sign-in.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(),
    provideHttpClient(withFetch())
    // GoogleSigninService,
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     GoogleLoginProvider: {
    //       clientId: '267275564598-nmpit5croecbv2a36r0p1g1f04m56e8t.apps.googleusercontent.com', 
    //     }
    //   }
    // }
  ]
};
