import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVehiclesListPageComponent } from './client-vehicles-list-page.component';

describe('ClientVehiclesListPageComponent', () => {
  let component: ClientVehiclesListPageComponent;
  let fixture: ComponentFixture<ClientVehiclesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientVehiclesListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientVehiclesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
