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
        _id: 1,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon',
        role: Role.MECHANICAL,
        prenom: '',
        motdepasse: '',
        token: ''
      },
      {
        _id: 2,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon',
        role: Role.MECHANICAL,
        prenom: '',
        motdepasse: '',
        token: ''
      },
      {
        _id: 3,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon',
        role: Role.MECHANICAL,
        prenom: '',
        motdepasse: '',
        token: ''
      },
      {
        _id: 4,
        registrationDate: new Date(),
        email: 'test@gmail.com',
        nom: 'Jean Dupon',
        role: Role.MECHANICAL,
        prenom: '',
        motdepasse: '',
        token: ''
      }
    ]
  }

  getFirstChar(letter: string){
    return letter.at(0);
  }
}
