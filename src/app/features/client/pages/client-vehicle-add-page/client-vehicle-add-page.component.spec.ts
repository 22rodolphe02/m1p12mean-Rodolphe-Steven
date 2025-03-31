import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVehicleAddPageComponent } from './client-vehicle-add-page.component';

describe('ClientVehicleAddPageComponent', () => {
  let component: ClientVehicleAddPageComponent;
  let fixture: ComponentFixture<ClientVehicleAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientVehicleAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientVehicleAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
