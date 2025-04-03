import {Routes} from '@angular/router';




const InvoiceDetailsPageComponent = () =>
  import('../invoice/pages/invoice-details-page/invoice-details-page.component').then(m => m.InvoiceDetailsPageComponent);

export const invoiceRoutes: Routes = [
  {
    path: ':invoiceId',
    loadComponent: InvoiceDetailsPageComponent
  },
]
