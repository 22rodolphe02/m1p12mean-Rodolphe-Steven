import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Mechanic} from '../../models/mechanic.model';
import {Role} from '../../../../core/models/user.model';

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
        nom: 'Jean Dupon',
        role: Role.MECHANICAL
      },
      {
        id: 2,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon',
        role: Role.MECHANICAL
      },
      {
        id: 3,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon',
        role: Role.MECHANICAL
      },
      {
        id: 4,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon',
        role: Role.MECHANICAL
      }
    ]
  }

  getFirstChar(letter: string){
    return letter.at(0);
  }
}
