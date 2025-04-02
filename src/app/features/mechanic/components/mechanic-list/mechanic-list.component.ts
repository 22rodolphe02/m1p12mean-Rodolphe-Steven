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
        createdAt: new Date(),
        email: 'test@gmail.com',
        name: 'Jean Dupon',
        role: Role.MECHANICAL,
        firstName: '',
        password: '',
        token: ''
      },
      {
        _id: 2,
        createdAt: new Date(),
        email: 'test@gmail.com',
        name: 'Jean Dupon',
        role: Role.MECHANICAL,
        firstName: '',
        password: '',
        token: ''
      },
      {
        _id: 3,
        createdAt: new Date(),
        email: 'test@gmail.com',
        name: 'Jean Dupon',
        role: Role.MECHANICAL,
        firstName: '',
        password: '',
        token: ''
      },
      {
        _id: 4,
        createdAt: new Date(),
        email: 'test@gmail.com',
        name: 'Jean Dupon',
        role: Role.MECHANICAL,
        firstName: '',
        password: '',
        token: ''
      }
    ]
  }

  getFirstChar(letter: string){
    return letter.at(0);
  }
}
