import {Component, input} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import {provideAnimations} from '@angular/platform-browser/animations';

@Component({
  selector: 'g-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  providers: [provideAnimations()],
  animations: [
    trigger('messageChange', [
      transition(':increment, :decrement', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoaderComponent {

  message = input<string>('chargement en cours...')

}
