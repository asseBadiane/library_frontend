import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     importProvidersFrom(HttpClientModule) // Import HttpClientModule
//   ]
// };