import {Routes} from '@angular/router';
import {invoiceRoutes} from '../invoice/invoice.routes';
import {vehicleRoutes} from '../vehicle/vehicle.routes';

const ClientDetailComponent = () =>
  import('../admin/pages/client-details-page/client-details-page.component').then(m => m.ClientDetailsPageComponent);

const InterventionHistory = () =>
  import('../interventions/pages/intervention-history/intervention-history.component').then(m => m.InterventionHistoryComponent);

const ClientDetailsInvoiceListPageComponent = () =>
  import('../admin/pages/client-invoices-page/client-invoices-page.component').then(m => m.ClientInvoicesPageComponent);


const InvoiceDetailsPageComponent = () =>
  import('../invoice/pages/invoice-details-page/invoice-details-page.component').then(m => m.InvoiceDetailsPageComponent);

export const clientRoutes: Routes = [
  {
    path: '', loadComponent: () =>
      import('../admin/pages/client-list-page/client-list-page.component').then(c => c.ClientListPageComponent),
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        loadComponent: ClientDetailComponent,
        children: [
          {
            path: 'vehicles',
            children: vehicleRoutes,
          },
          {
            path: 'interventions-history',
            loadComponent: InterventionHistory
          },
          {
            path: 'invoices',
            children: [
              {
                path: '',
                loadComponent: ClientDetailsInvoiceListPageComponent
              },
              {
                path: ':id',
                loadComponent: InvoiceDetailsPageComponent
              },
            ]
          },
          {
            path: '',
            pathMatch: "full",
            redirectTo: 'vehicles'
          }
        ]
      }
    ]
  }
];
