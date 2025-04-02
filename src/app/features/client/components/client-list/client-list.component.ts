import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Client} from '../../models/client.model';
import {Observable} from 'rxjs';
import {ClientService} from '../../services/client.service';
import {Role} from '../../../../core/models/user.model';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'g-client-list',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent{

  @Output() rowId: EventEmitter<number> = new EventEmitter()

  @Input({alias: 'actionLink', required: true}) actionLink: string = ''

  @Input({alias: 'data'}) clients: Client[] = []

  constructor() {
    this.fakeData();
  }

  fakeData(){
    // this.clients = [
    //   {
    //     _id: 1,
    //     name: "Dupont",
    //     firstName: "Jean",
    //     password: "securePass123",
    //     email: "jean.dupont@example.com",
    //     createdAt: new Date("2024-01-15"),
    //     token: "eyJhbGciOiJIUzI1NiIsIn...",
    //     role: Role.CLIENT,
    //     roleId: '44451d5f5sd',
    //   },
    //   {
    //     _id: 2,
    //     roleId: '44451d5f5sd',
    //     name: "Martin",
    //     firstName: "Sophie",
    //     password: "myStrongPass456",
    //     email: "sophie.martin@example.com",
    //     createdAt: new Date("2023-11-22"),
    //     token: "eyJhbGciOiJIUzI1NiIsIn...",
    //     role: Role.CLIENT,
    //   },
    //   {
    //     _id: 3,
    //     roleId: '44451d5f5sd',
    //     name: "Lemoine",
    //     firstName: "Paul",
    //     password: "paulPass789",
    //     email: "paul.lemoine@example.com",
    //     createdAt: new Date("2024-02-10"),
    //     token: "eyJhbGciOiJIUzI1NiIsIn...",
    //     role: Role.CLIENT,
    //     numberOfIntervention: 7
    //   }
    // ];
  }


}
