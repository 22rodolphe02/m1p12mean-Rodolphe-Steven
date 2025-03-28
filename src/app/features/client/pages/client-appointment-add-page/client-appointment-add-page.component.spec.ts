import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppointmentAddPageComponent } from './client-appointment-add-page.component';

describe('ClientAppointmentAddPageComponent', () => {
  let component: ClientAppointmentAddPageComponent;
  let fixture: ComponentFixture<ClientAppointmentAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAppointmentAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAppointmentAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
