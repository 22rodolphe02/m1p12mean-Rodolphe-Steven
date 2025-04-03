import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVehicleDetailsPageComponent } from './client-vehicle-details-page.component';

describe('VehicleDetailsPageComponent', () => {
  let component: ClientVehicleDetailsPageComponent;
  let fixture: ComponentFixture<ClientVehicleDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientVehicleDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientVehicleDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
