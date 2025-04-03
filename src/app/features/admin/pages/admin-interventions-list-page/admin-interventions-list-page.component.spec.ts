import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInterventionsListPageComponent } from './admin-interventions-list-page.component';

describe('AdminInterventionsListPageComponent', () => {
  let component: AdminInterventionsListPageComponent;
  let fixture: ComponentFixture<AdminInterventionsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInterventionsListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInterventionsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
