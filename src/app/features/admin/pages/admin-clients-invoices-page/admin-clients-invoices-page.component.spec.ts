import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientsInvoicesPageComponent } from './admin-clients-invoices-page.component';

describe('InvoiceListPageComponent', () => {
  let component: AdminClientsInvoicesPageComponent;
  let fixture: ComponentFixture<AdminClientsInvoicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClientsInvoicesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClientsInvoicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
