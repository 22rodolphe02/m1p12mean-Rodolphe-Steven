import {Component, EventEmitter, input, Input, InputSignal, model, ModelSignal, output, Output} from '@angular/core';
import {Service} from '../../models/service.model';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'g-service-item',
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './service-item.component.html',
  styleUrl: './service-item.component.scss'
})
export class ServiceItemComponent {

  service: InputSignal<Service> = input.required<Service>({alias: 'data'})
  selectable: InputSignal<boolean> = input(false);

  // selectedChange = output<boolean>()
  selected: InputSignal<boolean> = model(false);

  select!: boolean;
  onClick = output<boolean>();


  constructor() {
    this.select = false
    this.onClick.emit(this.select)
    // this.selected.set(this.select)
  }

  onSelect(){
    this.select = !this.select


    this.onClick.emit(this.select)
  }

}
