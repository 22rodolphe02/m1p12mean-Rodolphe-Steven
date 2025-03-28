import {
  Component,
  effect,
  EventEmitter,
  input,
  InputSignal, model, output,
  Output, OutputRef, ResourceRef
} from '@angular/core';
import {Service} from '../../../service/models/service.model';
import {ServiceItemComponent} from '../../../service/components/service-item/service-item.component';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {map,} from 'rxjs';
import {ServiceService} from '../../../service/services/service.service';
import {ApiResponse} from '../../../../core/models/response.model';
import {rxResource} from '@angular/core/rxjs-interop';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {tap} from 'rxjs/operators';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'g-select-service',
  imports: [
    ServiceItemComponent,
    FormsModule,
    LoaderComponent
  ],
  templateUrl: './select-service.component.html',
  styleUrl: './select-service.component.scss'
})
export class SelectServiceComponent {
  // chosen = output<Service[]>()

  chosen = model.required<Service[]>()

  // selectedServices: InputSignal<Service[]> = input.required<Service[]>()

  services: ResourceRef<ApiResponse<Service[]> | undefined> = rxResource({
    loader: () => this.serviceService.getAll()
  });

  get serviceData(){
    return this.services.value()!;
  }

  constructor(private serviceService: ServiceService) {
    // console.log(this.chosen())
    // effect(() => {
    //   this.chosen.emit([])
    // });
    this.setServices();
  }


  setServices(){

  }

  isSelected(service: Service){
    return this.chosen().some(s => s._id === service._id)
  }




  select(service: Service, selected: boolean) {

    // console.log(this.chosen())
    if (selected){
      // this.chosen().splice(index, 0, service)
      this.chosen().push(service)
    }else{

      const index = this.chosen().findIndex(value => value._id === service._id)
      this.chosen().splice(index, 1)
    }

    console.log("chosen: ", this.chosen())

    // this.chosen.emit(this.chosen())
  }
}
