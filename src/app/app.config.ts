
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http'; // Import HttpClientModule
import { LoggingInterceptor } from './interceptors/http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), // Import HttpClientModule
    provideHttpClient(withInterceptors([LoggingInterceptor]))
  ]
};

// providers: [
//   provideHttpClient(withInterceptors([loggingInterceptor]))
// ]