import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicInterventionDetailsPageComponent } from './mechanic-intervention-details-page.component';

describe('MechanicInterventionDetailsPageComponent', () => {
  let component: MechanicInterventionDetailsPageComponent;
  let fixture: ComponentFixture<MechanicInterventionDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicInterventionDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicInterventionDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
