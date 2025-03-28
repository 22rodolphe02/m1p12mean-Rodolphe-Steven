import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {httpErrorInterceptor} from './core/interceptors/http-error.interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  providers: [MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => httpErrorInterceptor,
      multi: true
    }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'garage-m1-front';
}
