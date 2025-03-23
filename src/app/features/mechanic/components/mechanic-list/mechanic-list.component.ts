import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Mechanic} from '../../models/mechanic.model';

@Component({
  selector: 'g-mechanic-list',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './mechanic-list.component.html',
  styleUrl: './mechanic-list.component.scss'
})
export class MechanicListComponent {

  @Input({alias: 'data'}) mechanics: Mechanic[] = []

  constructor() {
    this.fakeData()
  }

  fakeData(){
    this.mechanics = [
      {
        id: 1,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon'
      },
      {
        id: 2,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon'
      },
      {
        id: 3,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon'
      },
      {
        id: 4,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon'
      }
    ]
  }

  getFirstChar(letter: string){
    return letter.at(0);
  }
}
