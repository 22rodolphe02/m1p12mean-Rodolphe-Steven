import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicListPageComponent } from './mechanic-list-page.component';

describe('MechanicListPageComponent', () => {
  let component: MechanicListPageComponent;
  let fixture: ComponentFixture<MechanicListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
