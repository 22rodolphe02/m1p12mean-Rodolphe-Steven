import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicAppointmentsPageComponent } from './mechanic-appointments-page.component';

describe('MechanicAppointmentsPageComponent', () => {
  let component: MechanicAppointmentsPageComponent;
  let fixture: ComponentFixture<MechanicAppointmentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicAppointmentsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicAppointmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
