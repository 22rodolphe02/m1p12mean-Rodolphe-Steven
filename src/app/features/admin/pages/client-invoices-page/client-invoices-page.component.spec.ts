import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInvoicesPageComponent } from './client-invoices-page.component';

describe('InvoiceListPageComponent', () => {
  let component: ClientInvoicesPageComponent;
  let fixture: ComponentFixture<ClientInvoicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientInvoicesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientInvoicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
