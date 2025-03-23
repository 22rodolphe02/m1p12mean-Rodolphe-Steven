import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'garage-m1-front';
}
