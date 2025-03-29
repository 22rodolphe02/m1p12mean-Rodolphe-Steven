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
  currencyCode: string = 'MGA '

  @Output() rowId: EventEmitter<number> = new EventEmitter()

  @Input({alias: 'actionLink', required: true}) actionLink: string = ''

  @Input({alias: 'data'}) clients: Client[] = []

  constructor(private clientService: ClientService) {
    this.fakeData();
  }

  fakeData(){
    this.clients = [
      {
        id: 1,
        nom: "Dupont",
        prenom: "Jean",
        motdepasse: "securePass123",
        email: "jean.dupont@example.com",
        registrationDate: new Date("2024-01-15"),
        token: "eyJhbGciOiJIUzI1NiIsIn...",
        role: Role.CLIENT,
        numberOfVehicle: 2,
        numberOfIntervention: 5
      },
      {
        id: 2,
        nom: "Martin",
        prenom: "Sophie",
        motdepasse: "myStrongPass456",
        email: "sophie.martin@example.com",
        registrationDate: new Date("2023-11-22"),
        token: "eyJhbGciOiJIUzI1NiIsIn...",
        role: Role.CLIENT,
        numberOfVehicle: 1,
        numberOfIntervention: 2
      },
      {
        id: 3,
        nom: "Lemoine",
        prenom: "Paul",
        motdepasse: "paulPass789",
        email: "paul.lemoine@example.com",
        registrationDate: new Date("2024-02-10"),
        token: "eyJhbGciOiJIUzI1NiIsIn...",
        role: Role.CLIENT,
        numberOfVehicle: 3,
        numberOfIntervention: 7
      }
    ];
  }


}
