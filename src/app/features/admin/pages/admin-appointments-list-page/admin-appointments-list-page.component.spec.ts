import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppointmentsListPageComponent } from './admin-appointments-list-page.component';

describe('PlanningPageComponent', () => {
  let component: AdminAppointmentsListPageComponent;
  let fixture: ComponentFixture<AdminAppointmentsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAppointmentsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAppointmentsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
