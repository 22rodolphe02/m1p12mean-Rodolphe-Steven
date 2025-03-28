import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppointmentsPageComponent } from './client-appointments-page.component';

describe('ClientAppointmentsPageComponent', () => {
  let component: ClientAppointmentsPageComponent;
  let fixture: ComponentFixture<ClientAppointmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAppointmentsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAppointmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
