import {Component, input, Input, InputSignal, OnInit, signal} from '@angular/core';
import {Service} from '../../models/service.model';
import {CurrencyPipe} from '@angular/common';
import {Button} from 'primeng/button';
import {Dialog} from "primeng/dialog";
import {ServiceItemComponent} from '../service-item/service-item.component';

@Component({
  selector: 'g-service-list',
  imports: [
    ServiceItemComponent,
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {

  services: InputSignal<Service[]> = input<Service[]>([], { alias: 'data' });

  constructor() {
    if (this.services.length > 0) console.log("my services ", this.services)
    // if (this.services.length == 0) this.fakeData();
  }

  // ngOnInit(): void {
  //   console.log("services ", this.services)
  // }

  fakeData(){

    // this.services = [
    //   {
    //     _id: 1,
    //     nom: 'Reparation complète',
    //     description: 'Changement de pneu, et revision de tous les problème du moteur',
    //     prix: 25000,
    //     duree: 120
    //   },
    //   {
    //     _id: 2,
    //     nom: 'Changement de pneu',
    //     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A commodi corporis cupiditate debitis dolore dolorem et excepturi, expedita facilis, fuga hic, inventore libero molestias optio quisquam sint soluta vero voluptatem.',
    //     prix: 25000,
    //     duree: 120
    //   },
    //   {
    //     _id: 3,
    //     nom: 'Reparation complète',
    //     description: 'Changement de pneu, et revision de tous les problème du moteur',
    //     prix: 25000,
    //     duree: 120
    //   },
    //   {
    //     _id: 4,
    //     nom: 'Reparation complète',
    //     description: 'Changement de pneu, et revision de tous les problème du moteur',
    //     prix: 25000,
    //     duree: 120
    //   },
    // ]
  }

}
