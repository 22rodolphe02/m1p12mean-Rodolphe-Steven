import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInterventionHistoryComponent } from './client-intervention-history.component';

describe('InterventionHistoryComponent', () => {
  let component: ClientInterventionHistoryComponent;
  let fixture: ComponentFixture<ClientInterventionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientInterventionHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientInterventionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
