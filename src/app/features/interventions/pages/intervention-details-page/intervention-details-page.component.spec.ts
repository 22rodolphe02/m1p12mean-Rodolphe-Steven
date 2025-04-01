import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionDetailsPageComponent } from './intervention-details-page.component';

describe('InterventionDetailsPageComponent', () => {
  let component: InterventionDetailsPageComponent;
  let fixture: ComponentFixture<InterventionDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
