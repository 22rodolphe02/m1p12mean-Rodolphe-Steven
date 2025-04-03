import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPieceListPageComponent } from './admin-piece-list-page.component';

describe('AdminPieceListPageComponent', () => {
  let component: AdminPieceListPageComponent;
  let fixture: ComponentFixture<AdminPieceListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPieceListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPieceListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
