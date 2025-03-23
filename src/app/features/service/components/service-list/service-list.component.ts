import {Component, Input} from '@angular/core';
import {Service} from '../../models/service.model';
import {CurrencyPipe} from '@angular/common';
import {Button} from 'primeng/button';
import {Dialog} from "primeng/dialog";

@Component({
  selector: 'g-service-list',
    imports: [
        CurrencyPipe,
        Button,
    ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {

  @Input({alias: 'data'}) services: Service[] = []

  constructor() {
    this.fakeData();
  }

  fakeData(){

    this.services = [
      {
        id: 1,
        nom: 'Reparation complète',
        description: 'Changement de pneu, et revision de tous les problème du moteur',
        prix: 25000,
        duree: 120
      },
      {
        id: 2,
        nom: 'Changement de pneu',
        description: 'Changement de pneu, et revision de tous les problème du moteur',
        prix: 25000,
        duree: 120
      },
      {
        id: 3,
        nom: 'Reparation complète',
        description: 'Changement de pneu, et revision de tous les problème du moteur',
        prix: 25000,
        duree: 120
      },
      {
        id: 4,
        nom: 'Reparation complète',
        description: 'Changement de pneu, et revision de tous les problème du moteur',
        prix: 25000,
        duree: 120
      },
    ]
  }

}
