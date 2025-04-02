import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';

import Aura from '@primeng/themes/aura';
import {definePreset} from '@primeng/themes';
import {MessageService} from 'primeng/api';
import {httpErrorInterceptor} from './core/interceptors/http-error.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}'
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [MessageService,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor]),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: 'none'
        }
      }
    })]
};

