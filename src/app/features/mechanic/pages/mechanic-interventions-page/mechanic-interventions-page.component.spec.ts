import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicInterventionsPageComponent } from './mechanic-interventions-page.component';

describe('MechanicInterventionsPageComponent', () => {
  let component: MechanicInterventionsPageComponent;
  let fixture: ComponentFixture<MechanicInterventionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicInterventionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicInterventionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
